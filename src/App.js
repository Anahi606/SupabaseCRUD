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

  useEffect(() => {
    const validateSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      const user = data?.session?.user;

      if (!user || error) {
        console.log('No user or error:', error);
        if (location.pathname !== '/') navigate('/');
        setLoading(false);
        return;
      }

      const { data: roleData, error: roleError } = await supabase
        .from('Roles')
        .select('isAdmin')
        .eq('userid', user.id)
        .maybeSingle();

      if (roleError) {
        console.error('Error fetching role:', roleError);
        navigate('/');
        setLoading(false);
        return;
      }

      const role = roleData?.isAdmin ? 'admin' : 'user';
      setUserRole(role);

      if (role === 'admin' && location.pathname !== '/game') {
        navigate('/game');
      } else if (role === 'user' && location.pathname !== '/not-authorized') {
        navigate('/not-authorized');
      }

      setLoading(false);
    };

    validateSession();
  }, [navigate]);

  if (loading) return null;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/game" element={<Game />} />
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
