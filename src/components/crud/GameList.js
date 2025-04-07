import React from 'react';
import GameItem from './GameItem';

const GameList = ({ games, onDelete, onEdit }) => {
  return (
    <div>
      {games && games.length > 0 ? (
        games.map((game) => (
          <GameItem
            key={game.id}
            game={game}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      ) : (
        <p>No hay juegos disponibles.</p>
      )}
    </div>
  );
};

export default GameList;
