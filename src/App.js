import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/crud/Login';
import Game from './components/crud/Game';
import { supabase } from './components/supabaseConfig';

function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      const user = data?.session?.user;

      if (!user || error) {
        if (location.pathname !== '/') navigate('/');
      } else {
        if (location.pathname !== '/game') navigate('/game');
      }

      setLoading(false);
    };

    validateSession();
  }, [location.pathname, navigate]);

  if (loading) return null;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/game" element={<Game />} />
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
