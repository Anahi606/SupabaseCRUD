import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/crud/Login';
import Game from './components/crud/Game';
import { supabase } from './components/supabaseConfig';
import NotAuthorized from './components/NotAuthorized';

function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [isGameLoading, setIsGameLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      const user = data?.session?.user;

      if (!user || error) {
        console.log('No user or error:', error);
        if (location.pathname !== '/') navigate('/');
        setLoading(false);
        setIsGameLoading(false);
        return;
      }

      const { data: roleData, error: roleError } = await supabase
        .from('Roles')
        .select('isAdmin')
        .eq('userid', user.id)
        .maybeSingle();

      if (roleError) {
        console.error('Error fetching role:', roleError);
        setLoading(false);
        setIsGameLoading(false);
        return;
      }

      const role = roleData?.isAdmin ? 'admin' : 'user';
      setUserRole(role);

      if (role === 'user') {
        navigate('/not-authorized');
      }
      if (role === 'admin') {
        navigate('/game');
      }

      setLoading(false);
      setIsGameLoading(false);
    };

    validateSession();
  }, [navigate, location.pathname]);

  if (loading) return null;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/game" 
          element={
            isGameLoading ? (
              <div className="loading-container">
                <div className="loading-spinner">Cargando...</div>
              </div>
            ) : (
              <Game />
            )
          } 
        />
        <Route path="/not-authorized" element={<NotAuthorized />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
