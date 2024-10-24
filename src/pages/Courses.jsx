// src/pages/Courses.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

export default function Courses() {
  const navigate = useNavigate();  // Define el hook useNavigate

  const handleRegisterClick = () => {
    navigate('/Options');  // Redirige a la página "Options"
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-6 text-center">Cursos Disponibles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Card de Inteligencia Emocional con hover */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="h-48">
            <img src="iia.png" alt="Inteligencia Emocional" className="w-full h-full object-cover"/>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Inteligencia Emocional</h3>
            <p className="text-gray-700 mb-4">
              Aprende a gestionar tus emociones de manera efectiva y mejorar tu bienestar emocional.
            </p>
            <button 
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 transition-colors duration-300"
              onClick={handleRegisterClick}  // Añade el evento onClick para redirigir
            >
              Regístrate
            </button>
          </div>
        </div>

        {/* Card de Aprende Música (Próximamente) */}
        <div className="bg-gray-200 shadow-lg rounded-lg overflow-hidden">
          <div className="h-48">
            <img src="im.png" alt="Aprende Música" className="w-full h-full object-cover opacity-50"/>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-500">Aprende Música</h3>
            <p className="text-gray-500 mb-4">¡Próximamente!</p>
            <button className="w-full bg-gray-400 text-gray-700 py-2 rounded cursor-not-allowed" disabled>
              Próximamente
            </button>
          </div>
        </div>

        {/* Card de Aprende Lenguaje de Señas (Próximamente) */}
        <div className="bg-gray-200 shadow-lg rounded-lg overflow-hidden">
          <div className="h-48">
            <img src="ils.png" alt="Aprende Lenguaje de Señas" className="w-full h-full object-cover opacity-50"/>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-500">Aprende Lenguaje de Señas</h3>
            <p className="text-gray-500 mb-4">¡Próximamente!</p>
            <button className="w-full bg-gray-400 text-gray-700 py-2 rounded cursor-not-allowed" disabled>
              Próximamente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
