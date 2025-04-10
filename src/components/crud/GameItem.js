import React from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const Comments = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
`;

const Rating = styled.div`
  font-size: 1rem;
  color: #ffbb33;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
  margin-top: 8px;

  &:hover {
    background-color: #0056b3;
  }
`;

const GameItem = ({ game, onDelete, onEdit }) => {
  const handleEditClick = (gameId) => {
    window.scrollTo(0, 0);
    onEdit(gameId);
  };

  return (
    <GameContainer>
      <Title>{game.title || 'Sin título'}</Title>
      <Description>{game.description || 'No hay descripción disponible'}</Description>
      {game.imageUrl ? (
        <Image src={game.imageUrl} alt={game.title || 'Imagen del juego'} />
      ) : (
        <p>No hay imagen disponible</p>
      )}
      <Comments>
        <strong>Comentarios:</strong>
        <ul>
          {game.comments && game.comments.length > 0 ? (
            game.comments.map((comment, index) => <p key={index}>{comment}</p>)
          ) : (
            <p>No hay comentarios disponibles</p>
          )}
        </ul>
      </Comments>
      <Rating>Rating: {game.rating !== null ? game.rating : 'N/A'}/5</Rating>
      <div>
        <Button onClick={() => handleEditClick(game.id)}>Editar</Button>
        <Button onClick={() => onDelete(game.id)}>Eliminar</Button>
      </div>
    </GameContainer>
  );
};

export default GameItem;
