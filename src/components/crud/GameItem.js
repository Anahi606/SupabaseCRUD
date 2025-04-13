import React from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  width: 300px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  margin: 0 0 8px 0;
`;


const Description = styled.p`
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 12px;
`;

const Comments = styled.div`
  font-size: 0.85rem;
  color: #333;
  margin-top: 10px;
`;

const Rating = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  color: #007bff;
  margin: 12px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

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
      {game.imageUrl ? (
        <Image src={game.imageUrl} alt={game.title || 'Imagen del juego'} />
      ) : (
        <Image src="https://via.placeholder.com/300x180?text=Sin+imagen" alt="No disponible" />
      )}
      <Content>
        <Title>{game.title || 'Sin título'}</Title>
        <Description>{game.description || 'No hay descripción disponible'}</Description>
        <Rating>⭐ {game.rating !== null ? game.rating : 'N/A'} / 5</Rating>
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
      </Content>
      <ButtonGroup>
        <Button onClick={() => handleEditClick(game.id)}>Editar</Button>
        <Button onClick={() => onDelete(game.id)}>Eliminar</Button>
      </ButtonGroup>
    </GameContainer>
  );
};

export default GameItem;
