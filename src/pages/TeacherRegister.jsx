// src/pages/TeacherRegister.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function TeacherRegister() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    disability: 'visual',
    gender: 'masculino',
    email: '',
    password: '',
    bio: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, age, disability, gender, email, password, bio } = form;

    // Hash de contraseña (recomendado)
    // Aquí deberías implementar un hash de contraseña antes de enviarla a la base de datos
    // Por simplicidad, se almacena en texto plano (NO RECOMENDADO)

    const { data, error } = await supabase
      .from('users')
      .insert([
        { 
          name, 
          age: parseInt(age), 
          disability, 
          gender, 
          email, 
          password, 
          role: 'teacher',
          bio,
        },
      ]);

    if (error) {
      setError(error.message);
    } else {
      // Redirigir a la página de inicio de sesión
      navigate('/login');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Registro de Maestro/Tutor</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {/* Edad */}
        <div className="mb-4">
          <label className="block text-gray-700">Edad</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {/* Discapacidad */}
        <div className="mb-4">
          <label className="block text-gray-700">Discapacidad</label>
          <select
            name="disability"
            value={form.disability}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="visual">Visual</option>
            <option value="auditivo">Auditivo</option>
            <option value="motriz">Motriz</option>
          </select>
        </div>
        {/* Género */}
        <div className="mb-4">
          <label className="block text-gray-700">Género</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        {/* Correo Electrónico */}
        <div className="mb-4">
          <label className="block text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {/* Contraseña */}
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {/* Biografía */}
        <div className="mb-6">
          <label className="block text-gray-700">Biografía</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        {/* Botón de Envío */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500"
        >
          Registrarse como Maestro/Tutor
        </button>
      </form>
    </div>
  );
}
