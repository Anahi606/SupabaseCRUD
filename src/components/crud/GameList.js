import React from 'react';
import styled from 'styled-components';
import GameItem from './GameItem';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 16px;
  justify-content: center;
`;

const Message = styled.p`
  text-align: center;
  padding: 24px;
  font-size: 1.1rem;
  color: #666;
`;

const GameList = ({ games, onDelete, onEdit }) => {
  return (
    <GridContainer>
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
        <Message>No hay juegos disponibles.</Message>
      )}
    </GridContainer>
  );
};

export default GameList;
