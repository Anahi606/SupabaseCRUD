import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalStyle from '../styles/GlobalStyle';
import GameForm from './GameForm';
import GameList from './GameList';
import { supabase } from '../supabaseConfig';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;

  h1 {
    font-size: 30px;
    color: BLACK;
    font-family: 'Poppins', sans-serif;
  }

  button {
    background-color: #9b59b6;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-left: 20px;

    &:hover {
      background-color: #71b7e6;
    }
  }
`;
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
      <Header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Gestión de Videojuegos</h1>
          <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
      </Header>
      <GameForm gameToEdit={gameToEdit} onSave={handleSaveGame} />
      <GameList games={games} onDelete={handleDeleteGame} onEdit={handleEditGame} />
    </div>
  );
};

export default Games;
