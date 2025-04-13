import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalStyle from '../styles/GlobalStyle';
import GameForm from './GameForm';
import GameList from './GameList';
import { supabase } from '../supabaseConfig';

const Games = () => {
  const [games, setGames] = useState([]);
  const [gameToEdit, setGameToEdit] = useState(null);
  const navigate = useNavigate();

  const fetchGames = async () => {
    const { data, error } = await supabase.from('Games').select('*');
    if (error) {
      console.error('Error fetching games:', error.message);
    } else {
      setGames(data);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleSaveGame = (game) => {
    if (!game) {
      console.error('Game object is null or undefined');
      return;
    }

    if (gameToEdit) {
      const updateGame = async () => {
        const { error } = await supabase
          .from('Games')
          .update(game)
          .eq('id', gameToEdit.id);
        if (error) {
          console.error('Error updating game:', error.message);
        } else {
          await fetchGames();
          setGameToEdit(null);
        }
      };
      updateGame();
    } else {
      const refetchGame = async () => { await fetchGames(); };
      refetchGame();
    }
  };

  const handleDeleteGame = async (id) => {
    const { error } = await supabase.from('Games').delete().eq('id', id);
    if (error) {
      console.error('Error deleting game:', error.message);
    } else {
      setGames(games.filter((game) => game.id !== id));
    }
  };

  const handleEditGame = (id) => {
    const game = games.find((game) => game.id === id);
    setGameToEdit(game);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al intentar salir de cuenta:', error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      <GlobalStyle />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Gestión de Videojuegos</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <GameForm gameToEdit={gameToEdit} onSave={handleSaveGame} />
      <GameList games={games} onDelete={handleDeleteGame} onEdit={handleEditGame} />
    </div>
  );
};

export default Games;
