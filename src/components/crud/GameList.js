import React from 'react';
import GameItem from './GameItem';

const GameList = ({ games, onDelete, onEdit }) => {
  return (
    <div>
      {games.map((game) => (
        <GameItem
          key={game.id}
          game={game}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default GameList;
