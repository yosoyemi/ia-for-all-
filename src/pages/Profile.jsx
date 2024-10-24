// src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import EmotionalChatbot from '../components/EmotionalChatbot'; // Importar el chatbot

export default function Profile() {
  const [user, setUser] = useState(null);
  const [publications, setPublications] = useState([]);
  const [adviceList, setAdviceList] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [retroalimentations, setRetroalimentations] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        await fetchPublications(parsedUser.id);
        await fetchAdvice(parsedUser.id);
        await fetchQuestionnaires(parsedUser.id);
        await fetchRetroalimentations(parsedUser.id);
      } else {
        navigate('/login');
      }
    };
    fetchUserData();
  }, [navigate]);

  const fetchPublications = async (userId) => {
    const { data, error } = await supabase
      .from('publications')
      .select('*')
      .eq('teacher_id', userId);
    if (error) {
      setError('Error al cargar publicaciones.');
    } else {
      setPublications(data);
    }
  };

  const fetchAdvice = async (userId) => {
    const { data, error } = await supabase
      .from('advice')
      .select('*')
      .eq('user_id', userId);
    if (error) {
      setError('Error al cargar consejos.');
    } else {
      setAdviceList(data);
    }
  };

  const fetchQuestionnaires = async (userId) => {
    const { data, error } = await supabase
      .from('questionnaires')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) {
      setError('Error al cargar cuestionarios.');
    } else {
      setQuestionnaires(data);
    }
  };

  const fetchRetroalimentations = async (userId) => {
    // Obtener los IDs de los cuestionarios del usuario
    const { data: questionnaireIds, error: qError } = await supabase
      .from('questionnaires')
      .select('id')
      .eq('user_id', userId);

    if (qError) {
      setError('Error al cargar retroalimentaciones.');
      return;
    }

    const ids = questionnaireIds.map(q => q.id);

    if (ids.length === 0) {
      setRetroalimentations([]);
      return;
    }

    // Obtener las retroalimentaciones relacionadas
    const { data, error } = await supabase
      .from('retroalimentations')
      .select('*')
      .in('questionnaire_id', ids)
      .order('created_at', { ascending: false });

    if (error) {
      setError('Error al cargar retroalimentaciones.');
    } else {
      setRetroalimentations(data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Función para agrupar retroalimentaciones con cuestionarios
  const getQuestionnaireWithFeedback = () => {
    return questionnaires.map((qc) => {
      const feedback = retroalimentations.find((ret) => ret.questionnaire_id === qc.id);
      return { ...qc, feedback };
    });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8">
        {/* Header del Perfil */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-3xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-800">Hola, {user.name}!</h2>
              <p className="text-gray-500">Bienvenido a tu perfil</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md transition"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Información del Usuario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Información Personal</h3>
            <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
              <p className="mb-2">
                <span className="font-medium text-gray-700">Nombre:</span> {user.name}
              </p>
              <p className="mb-2">
                <span className="font-medium text-gray-700">Edad:</span> {user.age}
              </p>
              <p className="mb-2">
                <span className="font-medium text-gray-700">Discapacidad:</span> {user.disability}
              </p>
              <p className="mb-2">
                <span className="font-medium text-gray-700">Género:</span> {user.gender}
              </p>
              <p className="mb-2">
                <span className="font-medium text-gray-700">Email:</span> {user.email}
              </p>
            </div>
          </div>

          {/* Información Adicional para Profesores */}
          {user.role === 'teacher' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Información de Profesor</h3>
              <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
                <p className="mb-2">
                  <span className="font-medium text-gray-700">Número de Publicaciones:</span> {publications.length}
                </p>
                {/* Puedes agregar más información específica para profesores aquí */}
              </div>
            </div>
          )}
        </div>

        {/* Sección de Publicaciones */}
        {user.role === 'teacher' && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Tus Publicaciones</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {publications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {publications.map((pub) => (
                  <div key={pub.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
                    <h4 className="text-lg font-semibold text-indigo-600 mb-2">Publicación #{pub.id}</h4>
                    <p className="text-gray-700">{pub.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No tienes publicaciones aún.</p>
            )}
          </div>
        )}

        {/* Sección de Consejos Recibidos */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Consejos Recibidos</h3>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {adviceList.length > 0 ? (
            <div className="space-y-4">
              {adviceList.map((adv) => (
                <div key={adv.id} className="bg-white shadow-md rounded-lg p-6 flex items-start">
                  {/* Icono de consejo */}
                  <svg
                    className="w-6 h-6 text-green-500 mr-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                    />
                  </svg>
                  <p className="text-gray-700">{adv.advice_text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No has recibido consejos aún.</p>
          )}
        </div>

        {/* Sección de Historial de Cuestionarios y Retroalimentaciones */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Historial de Cuestionarios y Retroalimentaciones</h3>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {questionnaires.length > 0 ? (
            <div className="space-y-4">
              {getQuestionnaireWithFeedback().map((qc) => (
                <div key={qc.id} className="bg-white shadow-md rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-indigo-600">Cuestionario #{qc.id}</h4>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        qc.result === 'Muy Positivo' || qc.result === 'Positivo'
                          ? 'bg-green-500'
                          : qc.result === 'Neutral'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {qc.result}
                    </span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-medium text-gray-800">Fecha:</span> {new Date(qc.created_at).toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium text-gray-800">Tipo:</span> {qc.type}
                  </p>
                  {/* Mostrar Retroalimentación si existe */}
                  {qc.feedback && (
                    <div className="mt-4">
                      <p className="text-gray-700">
                        <span className="font-medium text-gray-800">Retroalimentación:</span> {qc.feedback.feedback}
                      </p>
                    </div>
                  )}
                  {/* Mostrar Recomendación si existe */}
                  {qc.recommendation && (
                    <div className="mt-4">
                      <p className="text-gray-700">
                        <span className="font-medium text-gray-800">Recomendaciones:</span> {qc.recommendation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No has completado ningún cuestionario aún.</p>
          )}
        </div>

        {/* Sección del Chatbot Emocional */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Chatbot Emocional</h3>
          <EmotionalChatbot />
        </div>
      </div>
    </div>
  );
}
