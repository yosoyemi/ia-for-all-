// src/components/EmotionalChatbot.jsx
import React, { useState, useEffect } from 'react';
import Sentiment from 'sentiment';

const EmotionalChatbot = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [sentimentScore, setSentimentScore] = useState(null);
  const [sentimentLabel, setSentimentLabel] = useState('');
  const sentiment = new Sentiment();

  // Verificar si el navegador soporta la Web Speech API
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (!recognition) {
      alert('Tu navegador no soporta la Web Speech API.');
      return;
    }

    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      analizarSentimiento(speechResult);
    };

    recognition.onerror = (event) => {
      console.error('Error en el reconocimiento de voz:', event.error);
      setListening(false);
    };
  }, [recognition]);

  const startListening = () => {
    if (!recognition) return;
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    if (!recognition) return;
    setListening(false);
    recognition.stop();
  };

  const hablar = (texto) => {
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-ES';
    window.speechSynthesis.speak(utterance);
  };

  const analizarSentimiento = (mensaje) => {
    const result = sentiment.analyze(mensaje);
    setSentimentScore(result.score);

    let label = '';
    if (result.score > 0) {
      label = 'positivo';
    } else if (result.score < 0) {
      label = 'negativo';
    } else {
      label = 'neutral';
    }
    setSentimentLabel(label);

    const respuesta = responderEmocion(label);
    setResponse(respuesta);
    hablar(respuesta);
  };

  const responderEmocion = (sentimiento) => {
    if (sentimiento === 'positivo') {
      return '¡Me alegra saber que te sientes bien! 😊 ¿Hay algo más que quieras compartir?';
    } else if (sentimiento === 'negativo') {
      return 'Lamento que te sientas así. 😔 ¿Te gustaría hablar sobre lo que te molesta?';
    } else if (sentimiento === 'neutral') {
      return 'Parece que estás neutral. ¿Te gustaría hablar sobre algo en particular?';
    }
    return '¿Cómo te sientes hoy?';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center">Chatbot Emocional</h2>

        <div className="mb-4">
          <button
            onClick={listening ? stopListening : startListening}
            className={`w-full px-4 py-2 rounded-lg text-white ${
              listening ? 'bg-red-500 hover:bg-red-400' : 'bg-indigo-600 hover:bg-indigo-500'
            } transition`}
          >
            {listening ? 'Detener Escucha' : 'Hablar'}
          </button>
        </div>

        {transcript && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-800"><span className="font-semibold">Tú:</span> {transcript}</p>
            {sentimentLabel && (
              <p className={`mt-2 text-sm ${sentimentLabel === 'positivo' ? 'text-green-600' : sentimentLabel === 'negativo' ? 'text-red-600' : 'text-yellow-600'}`}>
                Sentimiento: {sentimentLabel.charAt(0).toUpperCase() + sentimentLabel.slice(1)}
              </p>
            )}
          </div>
        )}

        {response && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-800"><span className="font-semibold">Chatbot:</span> {response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionalChatbot;
