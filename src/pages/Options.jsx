// src/pages/Options.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Options() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-6 text-center">Opciones de Inteligencia Emocional</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {/* Card de Controla tu Inteligencia Emocional */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="h-48">
            <img src="ImgFormI.png" alt="Controla tu Inteligencia Emocional" className="w-full h-full object-cover"/>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Controla tu Inteligencia Emocional</h3>
            <p className="text-gray-700 mb-4">
              Realiza este cuestionario y mejora tu control emocional.
            </p>
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 transition-colors duration-300"
              onClick={() => navigate('/questionnaire')} // Redirección a Questionnaire
            >
              Cuestionario
            </button>
          </div>
        </div>

        {/* Card de Posiciones de Respiración */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="h-48">
            <img src="yoga.png" alt="Posiciones de Respiración" className="w-full h-full object-cover"/>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Posiciones de Respiración</h3>
            <p className="text-gray-700 mb-4">
              Aprende técnicas de respiración para mantener la calma.
            </p>
            <button
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500 transition-colors duration-300"
              onClick={() => navigate('/positions')} // Redirección a Positions
            >
              Ver Posiciones
            </button>
          </div>
        </div>

        {/* Card de Música (Próximamente) */}
        <div className="bg-gray-200 shadow-lg rounded-lg overflow-hidden">
          <div className="h-48">
            <img src="musica.png" alt="Música" className="w-full h-full object-cover opacity-50"/>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-500">Música</h3>
            <p className="text-gray-500 mb-4">
              ¡Próximamente!
            </p>
            <button className="w-full bg-gray-400 text-gray-700 py-2 rounded cursor-not-allowed" disabled>
              Próximamente
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
