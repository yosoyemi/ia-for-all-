// src/pages/YogaPoses.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function YogaPoses() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-6 text-center">Posturas de Yoga para la Inteligencia Emocional</h2>
      <p className="text-gray-700 mb-4 text-center">
        Practicar yoga ayuda a cultivar la atención plena y el autocontrol, promoviendo una mayor inteligencia emocional.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {/* Card de Vrksasana */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="h-48">
            <img src="y1.png" alt="Vrksasana" className="w-full h-full object-cover"/>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Encuentra tu centro</h3>
            <p className="text-gray-700 mb-4">
              <strong>Vrksasana - Postura del Árbol:</strong> Centra la mirada en un punto fijo para mantener el equilibrio. Lleva el peso del cuerpo hacia tu pierna derecha y actívala.
            </p>
          </div>
        </div>

        {/* Card de Prapadasana */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="h-48">
            <img src="y2.png" alt="Prapadasana" className="w-full h-full object-cover"/>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Mente más enfocada</h3>
            <p className="text-gray-700 mb-4">
              <strong>Prapadasana - Postura de Puntillas:</strong> Ponte de puntillas y flexiona las rodillas hasta que los glúteos toquen los talones.
            </p>
          </div>
        </div>

        {/* Card de Ardha Padma Prapadasana */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="h-48">
            <img src="y3.png" alt="Ardha Padma Prapadasana" className="w-full h-full object-cover"/>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Desarrolla tu potencial</h3>
            <p className="text-gray-700 mb-4">
              <strong>Ardha Padma Prapadasana:</strong> Coloca el tobillo izquierdo sobre el muslo derecho y mantén el foco en un punto.
            </p>
          </div>
        </div>

        {/* Card de Utthan Pristhasana */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="h-48">
            <img src="y4.png" alt="Utthan Pristhasana" className="w-full h-full object-cover"/>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Alcanza la calma</h3>
            <p className="text-gray-700 mb-4">
              <strong>Utthan Pristhasana - Postura del Dragón:</strong> Desde la postura de la tabla, lleva el pie derecho hacia delante junto a la mano derecha.
            </p>
          </div>
        </div>

        {/* Card de Utthita Parsvakonasana */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="h-48">
            <img src="y5.png" alt="Utthita Parsvakonasana" className="w-full h-full object-cover"/>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Gana más serenidad</h3>
            <p className="text-gray-700 mb-4">
              <strong>Utthita Parsvakonasana - Postura de Ángulo Lateral Extendida:</strong> Desde la postura del dragón, apoya la mano y extiende el brazo contrario.
            </p>
          </div>
        </div>

        {/* Card de Camatkarasana */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="h-48">
            <img src="y6.png" alt="Camatkarasana" className="w-full h-full object-cover"/>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Pierde los miedos</h3>
            <p className="text-gray-700 mb-4">
              <strong>Camatkarasana - Postura Salvaje:</strong> Desde la plancha, lleva el pie hacia atrás, abriendo el pecho y la pelvis hacia arriba.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
