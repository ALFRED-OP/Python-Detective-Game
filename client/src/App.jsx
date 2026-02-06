import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CaseView from './pages/CaseView';
import Leaderboard from './pages/Leaderboard';
import AdminDashboard from './pages/AdminDashboard';

// Components
import Layout from './components/common/Layout';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  // Determine the base URL for React Router
  // In dev (npm run dev), it's '/'
  // In XAMPP (npm run build), it's '/Python-Detective-Game/client/dist'
  const basename = import.meta.env.PROD ? '/Python-Detective-Game/client/dist' : '/';

  return (
    <Router basename={basename}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/case/:id" element={
            <ProtectedRoute>
              <Layout>
                <CaseView />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <Layout>
                <Leaderboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          } />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
