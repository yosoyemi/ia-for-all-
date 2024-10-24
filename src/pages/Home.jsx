// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      {!user ? (
        // Home para usuarios no autenticados
        <div className="text-center px-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Bienvenido a Nuestra Plataforma
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Únete a nosotros para desarrollar tus habilidades cognitivas y acceder a cursos exclusivos.
          </p>
          <div className="mt-8 flex justify-center gap-x-4">
            <Link
              to="/register"
              className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition"
            >
              Registrarse
            </Link>
            <Link
              to="/login"
              className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 transition"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      ) : (
        // Home para usuarios autenticados
        <div className="text-center px-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            ¡Hola, {user.name}!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Bienvenido de nuevo a nuestra plataforma. Explora nuestros cursos y sigue desarrollando tus habilidades.
          </p>
          <div className="mt-8 flex justify-center gap-x-4">
            <Link
              to="/courses"
              className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition"
            >
              Ver Cursos
            </Link>
            <Link
              to="/profile"
              className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 transition"
            >
              Mi Perfil
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
