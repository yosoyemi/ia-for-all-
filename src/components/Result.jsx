// src/components/Result.jsx
import React from 'react';

export default function Result({ result, feedback, setFeedback, handleFeedbackSubmit, recommendation }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">Resultado del Cuestionario</h2>
        <p className="text-xl mb-6">
          Tu estado de ánimo es: <span className="font-semibold">{result}</span>
        </p>

        {/* Recomendaciones Basadas en el Resultado */}
        {recommendation && (
          <div className="mb-6 text-left">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Recomendaciones</h3>
            <p className="text-gray-700 whitespace-pre-line">{recommendation}</p>
          </div>
        )}

        {/* Retroalimentación del Usuario */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">
            ¿Qué tan identificado te sientes con este resultado?
          </label>
          <select
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="Muy identificado">Muy identificado</option>
            <option value="Identificado">Identificado</option>
            <option value="Neutral">Neutral</option>
            <option value="Poco identificado">Poco identificado</option>
            <option value="Nada identificado">Nada identificado</option>
          </select>
        </div>

        <button
          onClick={handleFeedbackSubmit}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition"
        >
          Guardar Retroalimentación
        </button>
      </div>
    </div>
  );
}
