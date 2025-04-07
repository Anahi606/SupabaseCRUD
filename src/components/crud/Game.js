import React, { useState } from 'react';
import GlobalStyle from '../styles/GlobalStyle';
import GameForm from './GameForm';
import GameList from './GameList';

const Game = () => {
  const [games, setGames] = useState([]);
  const [gameToEdit, setGameToEdit] = useState(null);

  const handleSaveGame = (game) => {
    if (gameToEdit) {
      setGames(games.map((g) => (g.id === gameToEdit.id ? { ...gameToEdit, ...game } : g)));
      setGameToEdit(null);
    } else {
      setGames([...games, { ...game, id: Date.now() }]);
    }
  };

  const handleDeleteGame = (id) => {
    setGames(games.filter((game) => game.id !== id));
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

export default Game;
