import React, { useState, useEffect } from 'react';
import GlobalStyle from '../styles/GlobalStyle';
import GameForm from './GameForm';
import GameList from './GameList';
import { supabase } from '../supabaseConfig';

const Games = () => {
  const [games, setGames] = useState([]);
  const [gameToEdit, setGameToEdit] = useState(null);

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
    console.log("Game.js",game);
    if (!game) {
      console.error('Game object is null or undefined');
      return;
    }

    if (gameToEdit) {
      const updateGame = async () => {
        const { data, error } = await supabase
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
        console.log("If game.js");
        const refetchGame=async()=>{await fetchGames()};
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

  return (
    <div>
      <GlobalStyle />
      <h1>Gestión de Videojuegos</h1>
      <GameForm gameToEdit={gameToEdit} onSave={handleSaveGame} />
      <GameList games={games} onDelete={handleDeleteGame} onEdit={handleEditGame} />
    </div>
  );
};

export default Games;
