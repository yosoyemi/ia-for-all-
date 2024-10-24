// src/pages/TeacherDashboard.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {
  const [publications, setPublications] = useState([]);
  const [newPublication, setNewPublication] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role !== 'teacher') {
          navigate('/login');
          return;
        }
        fetchPublications(parsedUser.id);
        fetchStudents(parsedUser.id);
      } else {
        navigate('/login');
      }
    };
    fetchDashboardData();
  }, [navigate]);

  const fetchPublications = async (teacherId) => {
    const { data, error } = await supabase
      .from('publications')
      .select('*')
      .eq('teacher_id', teacherId);
    if (error) {
      setError('Error al cargar publicaciones.');
    } else {
      setPublications(data);
    }
  };

  const fetchStudents = async (teacherId) => {
    // Supongamos que hay una tabla de asignaciones
    const { data, error } = await supabase
      .from('assignments')
      .select('student_id (name, email), enrollments (progress)')
      .eq('teacher_id', teacherId);
    if (error) {
      setError('Error al cargar estudiantes.');
    } else {
      setStudents(data);
    }
  };

  const handlePublicationSubmit = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;
    const parsedUser = JSON.parse(storedUser);
    const teacherId = parsedUser.id;

    const { data, error } = await supabase.from('publications').insert([
      {
        teacher_id: teacherId,
        content: newPublication,
      },
    ]);

    if (error) {
      setError('Error al publicar.');
    } else {
      setPublications([...publications, data[0]]);
      setNewPublication('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Dashboard de Maestro/Tutor</h2>
      {error && <p className="text-red-500">{error}</p>}

      {/* Publicar Nuevo Contenido */}
      <form onSubmit={handlePublicationSubmit} className="mb-6">
        <textarea
          value={newPublication}
          onChange={(e) => setNewPublication(e.target.value)}
          required
          placeholder="Escribe una nueva publicación..."
          className="w-full px-3 py-2 border rounded mb-2"
        ></textarea>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
        >
          Publicar
        </button>
      </form>

      {/* Lista de Publicaciones */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Tus Publicaciones</h3>
        {publications.length > 0 ? (
          publications.map((pub) => (
            <div key={pub.id} className="border p-2 rounded mb-2">
              {pub.content}
            </div>
          ))
        ) : (
          <p>No hay publicaciones.</p>
        )}
      </div>

      {/* Progreso de Estudiantes */}
      <div>
        <h3 className="text-xl font-semibold">Progreso de Estudiantes</h3>
        {students.length > 0 ? (
          <table className="min-w-full mt-2">
            <thead>
              <tr>
                <th className="px-4 py-2">Nombre Estudiante</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Progreso (%)</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.student_id}>
                  <td className="border px-4 py-2">{student.student_id.name}</td>
                  <td className="border px-4 py-2">{student.student_id.email}</td>
                  <td className="border px-4 py-2">
                    {student.enrollments.length > 0
                      ? student.enrollments[0].progress
                      : '0'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay estudiantes asignados.</p>
        )}
      </div>
    </div>
  );
}
