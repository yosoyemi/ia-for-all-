import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Questionnaire from './pages/Questionnaire';
import Courses from './pages/Courses';
import Profile from './pages/Profile';
import TeacherRegister from './pages/TeacherRegister';
import TeacherDashboard from './pages/TeacherDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Options from './pages/Options';
import Positions from './pages/Positions';  // Importa Positions.jsx
import EmotionalChatbot from './components/EmotionalChatbot';


export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 mt-44 p-4 bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/teacher-register" element={<TeacherRegister />} />
            <Route path="/options" element={<Options />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chatbot" element={<ProtectedRoute><EmotionalChatbot /></ProtectedRoute>} />


            {/* Nueva ruta para Positions */}
            <Route
              path="/positions"
              element={<Positions />}  // Agrega Positions.jsx como nueva ruta
            />

            <Route
              path="/questionnaire"
              element={
                <ProtectedRoute>
                  <Questionnaire />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher-dashboard"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
