// src/components/Question.jsx
import React from 'react';

export default function Question({
  question,
  response,
  handleChange,
}) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <label className="block text-gray-800 text-lg font-medium mb-2">
        {question.question}
      </label>

      {/* Manejar diferentes tipos de preguntas */}
      {question.videoUrl ? (
        <div className="mt-4">
          <iframe
            width="100%"
            height="315"
            src={question.videoUrl}
            title="Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      ) : question.imageUrl ? (
        <div className="mt-4">
          <img
            src={question.imageUrl}
            alt="Imagen del cuestionario"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      ) : question.type === 'songSelection' ? (
        <div className="mt-4">
          <select
            name={`question_${question.id}`}
            value={response || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>
              Selecciona una canción
            </option>
            <option value="La manzanita">La manzanita</option>
            <option value="Chasing Cars">Chasing Cars</option>
            <option value="Dies Irae">Dies Irae</option>
          </select>
        </div>
      ) : (
        <div className="mt-4">
          <select
            name={`question_${question.id}`}
            value={response || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="1">Muy mal</option>
            <option value="2">Mal</option>
            <option value="3">Neutral</option>
            <option value="4">Bien</option>
            <option value="5">Muy bien</option>
          </select>
        </div>
      )}
    </div>
  );
}
