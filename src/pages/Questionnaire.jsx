// src/pages/Questionnaire.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Question from '../components/Question';
import Result from '../components/Result';

export default function Questionnaire() {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        loadQuestions(parsedUser.disability);
      } else {
        navigate('/login');
      }
    };
    fetchUserData();
  }, [navigate]);

  const loadQuestions = (disability) => {
    let q = [];
    if (disability === 'visual') {
      q = [
        { id: 1, question: '¿Te sientes feliz hoy?' },
        { id: 2, question: '¿Has experimentado estrés recientemente?' },
        { id: 3, question: 'Canción para Felicidad: La manzanita', videoUrl: 'https://www.youtube.com/embed/LHdm7-n0_RY' },
        { id: 4, question: '¿Cómo te hizo sentir la canción "La manzanita"?' },
        { id: 5, question: 'Canción para Tristeza: Chasing Cars', videoUrl: 'https://www.youtube.com/embed/GemKqzILV4w' },
        { id: 6, question: '¿Cómo te hizo sentir la canción "Chasing Cars"?' },
        { id: 7, question: 'Canción para Miedo: Dies Irae', videoUrl: 'https://www.youtube.com/embed/CUGMZlvrR4c' },
        { id: 8, question: '¿Cómo te hizo sentir la canción "Dies Irae"?' },
        {
          id: 9,
          question: '¿Con qué canción te sentiste más identificado?',
          type: 'songSelection',
        },
        { id: 10, question: '¿Cómo te sientes después de escuchar las canciones?' },
      ];
    } else if (disability === 'auditivo') {
      q = [
        { id: 1, question: '¿Te sientes escuchado por quienes te rodean?' },
        { id: 2, question: '¿Has sentido frustración últimamente?' },
        { id: 3, question: 'Imagen de Naturaleza', imageUrl: 'https://example.com/naturaleza.jpg' },
        { id: 4, question: '¿Cómo te hizo sentir la imagen de naturaleza?' },
        { id: 5, question: 'Imagen de Ciudad', imageUrl: 'https://example.com/ciudad.jpg' },
        { id: 6, question: '¿Cómo te hizo sentir la imagen de ciudad?' },
        { id: 7, question: 'Imagen de Mar', imageUrl: 'https://example.com/mar.jpg' },
        { id: 8, question: '¿Cómo te hizo sentir la imagen del mar?' },
        { id: 9, question: '¿Has experimentado emociones similares a las imágenes recientemente?' },
      ];
    } else if (disability === 'motriz') {
      q = [
        { id: 1, question: '¿Te sientes cómodo con tus actividades diarias?' },
        { id: 2, question: '¿Has enfrentado desafíos físicos recientemente?' },
        { id: 3, question: '¿Qué evento te hizo sentir más feliz hoy?' },
        { id: 4, question: '¿Cómo describirías tu nivel de energía hoy?' },
        { id: 5, question: '¿Qué tan satisfecho estás con tu día?' },
        { id: 6, question: '¿Has tenido momentos de calma hoy?' },
      ];
    }

    setQuestions(q);
  };

  const handleChange = (e) => {
    setResponses({ ...responses, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const calculatedResult = processResponses(responses);
    setResult(calculatedResult);
    generateRecommendation(calculatedResult);

    try {
      // Insertar el cuestionario en la base de datos
      const { data: questionnaireData, error: questionnaireError } = await supabase.from('questionnaires').insert([
        {
          user_id: user.id,
          type: user.disability,
          responses: responses,
          result: calculatedResult,
        },
      ]).select('id');

      if (questionnaireError) {
        throw questionnaireError;
      }

      const questionnaireId = questionnaireData[0].id;

      // Insertar la retroalimentación en la tabla retroalimentations
      const { error: retroError } = await supabase.from('retroalimentations').insert([
        {
          questionnaire_id: questionnaireId,
          feedback: feedback, // Inicialmente vacío, se actualizará después
        },
      ]);

      if (retroError) {
        throw retroError;
      }

      setIsSubmitting(false);
    } catch (err) {
      console.error(err);
      setError('Error al guardar el cuestionario y la retroalimentación.');
      setIsSubmitting(false);
    }
  };

  const processResponses = (responses) => {
    let sum = 0;
    let maxSum = 0;
    for (let key in responses) {
      const value = parseInt(responses[key]);
      if (!isNaN(value)) {
        sum += value;
        maxSum += 5; // Asumiendo que la respuesta máxima es 5
      }
    }
    const percentage = (sum / maxSum) * 100;

    if (percentage >= 80) {
      return 'Muy Positivo';
    } else if (percentage >= 60) {
      return 'Positivo';
    } else if (percentage >= 40) {
      return 'Neutral';
    } else if (percentage >= 20) {
      return 'Negativo';
    } else {
      return 'Muy Negativo';
    }
  };

  const generateRecommendation = (result) => {
    switch (result) {
      case 'Muy Positivo':
        setRecommendation(`
¡Excelente! Continúa manteniendo estas prácticas positivas. Considera:
- **Meditación Avanzada**: Profundiza en tu práctica de meditación para mejorar aún más tu bienestar.
- **Voluntariado**: Participa en actividades de voluntariado para fortalecer tu sentido de comunidad.
- **Ejercicios de Gratitud**: Lleva un diario de gratitud para enfocarte en lo positivo de tu vida.
        `);
        break;
      case 'Positivo':
        setRecommendation(`
¡Bien hecho! Mantén tus hábitos positivos y considera:
- **Ejercicios de Gratitud**: Anota tres cosas por las que estás agradecido cada día.
- **Actividad Física**: Incorpora ejercicios regulares como caminar o yoga en tu rutina diaria.
- **Conexión Social**: Dedica tiempo a conectar con amigos y familiares.
        `);
        break;
      case 'Neutral':
        setRecommendation(`
Tu estado de ánimo es equilibrado. Puedes beneficiarte de:
- **Yoga o Meditación**: Actividades que promuevan la calma y el equilibrio.
- **Lectura**: Dedica tiempo a leer libros que te interesen y te relajen.
- **Planificación de Metas**: Establece metas pequeñas y alcanzables para mantener tu motivación.
        `);
        break;
      case 'Negativo':
        setRecommendation(`
Parece que has enfrentado algunos desafíos. Considera:
- **Técnicas de Manejo del Estrés**: Prueba ejercicios de respiración profunda o meditación guiada.
- **Hablar con un Profesional**: Considera consultar a un terapeuta o consejero.
- **Actividades Recreativas**: Participa en actividades que disfrutes para mejorar tu estado de ánimo.
        `);
        break;
      case 'Muy Negativo':
        setRecommendation(`
Es importante que busques apoyo. Considera:
- **Contactar a un Terapeuta**: Busca ayuda profesional para manejar tus emociones.
- **Grupos de Apoyo**: Únete a grupos de apoyo donde puedas compartir y recibir ayuda.
- **Ejercicio Físico Regular**: Actividades físicas pueden ayudar a mejorar tu estado de ánimo.
        `);
        break;
      default:
        setRecommendation('');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit(); // Si es la última pregunta, guardar y mostrar resultado
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback) {
      setError('Por favor, proporciona tu retroalimentación.');
      return;
    }

    try {
      // Obtener el último cuestionario insertado
      const { data: questionnaireData, error: questionnaireError } = await supabase
        .from('questionnaires')
        .select('id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (questionnaireError || !questionnaireData.length) {
        throw questionnaireError || new Error('No se encontró el cuestionario.');
      }

      const questionnaireId = questionnaireData[0].id;

      // Actualizar la retroalimentación en la tabla retroalimentations
      const { error: retroError } = await supabase
        .from('retroalimentations')
        .update({ feedback: feedback })
        .eq('questionnaire_id', questionnaireId);

      if (retroError) {
        throw retroError;
      }

      // Redireccionar al usuario a la pestaña de cursos
      navigate('/courses'); // Asegúrate de que esta ruta exista en tu aplicación
    } catch (err) {
      console.error(err);
      setError('Error al guardar la retroalimentación.');
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  if (result) {
    return (
      <Result
        result={result}
        feedback={feedback}
        setFeedback={setFeedback}
        handleFeedbackSubmit={handleFeedbackSubmit}
        recommendation={recommendation}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Cuestionario de Bienestar</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Barra de Progreso */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {((currentQuestionIndex + 1) / questions.length * 100).toFixed(0)}% completado
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-2">
            Pregunta {currentQuestionIndex + 1} de {questions.length}
          </p>
          <Question
            question={questions[currentQuestionIndex]}
            response={responses[`question_${questions[currentQuestionIndex].id}`]}
            handleChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleNextQuestion}
            disabled={isSubmitting}
            className={`w-32 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
        {isSubmitting && (
          <div className="flex justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600"></div>
          </div>
        )}
      </div>
    </div>
  );
}
