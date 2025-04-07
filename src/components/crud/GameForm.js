import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabaseConfig';

const FormContainer = styled.div`
  background-color: #d1bec4;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const GameForm = ({ gameToEdit, onSave }) => {
  const [title, setTitle] = useState(gameToEdit ? gameToEdit.title : '');
  const [description, setDescription] = useState(gameToEdit ? gameToEdit.description : '');
  const [imageUrl, setImageUrl] = useState(gameToEdit ? gameToEdit.imageUrl : '');
  const [comments, setComments] = useState(gameToEdit ? gameToEdit.comments?.join(', ') : '');
  const [rating, setRating] = useState(gameToEdit ? gameToEdit.rating?.toString() : '');

  const saveGame = async (newGame) => {
    const { data, error } = gameToEdit
      ? await supabase
          .from('Games')
          .update(newGame)
          .eq('id', gameToEdit.id)
      : await supabase.from('Games').insert([newGame]);

    if (error) {
      console.error('Error guardando el juego:', error.message);
    } else {
        console.log("gameform.js",data);
      onSave(newGame);
      resetForm();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGame = {
      title,
      description,
      imageUrl,
      comments: comments ? comments.split(',').map((comment) => comment.trim()) : [],
      rating: rating ? parseFloat(rating) : null,
    };
    console.log("GameForm.js",newGame);
    saveGame(newGame);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setComments('');
    setRating('');
  };

  useEffect(() => {
    if (gameToEdit) {
      setTitle(gameToEdit.title || '');
      setDescription(gameToEdit.description || '');
      setImageUrl(gameToEdit.imageUrl || '');
      setComments(gameToEdit.comments?.join(', ') || '');
      setRating(gameToEdit.rating !== null ? gameToEdit.rating.toString() : '');
    }
  }, [gameToEdit]);

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del juego"
        />
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
        />
        <Input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="URL de la imagen"
        />
        <Input
          type="text"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Comentarios (separados por coma)"
        />
        <Input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Puntuación"
          min="0"
          max="10"
          step="0.1"
        />
        <Button type="submit">{gameToEdit ? 'Actualizar Juego' : 'Agregar Juego'}</Button>
      </form>
    </FormContainer>
  );
};

export default GameForm;
