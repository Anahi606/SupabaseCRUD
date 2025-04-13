import React, { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabaseConfig';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
`;

const FormWrapper = styled.div`
  max-width: 700px;
  width: 100%;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h2`
  font-size: 25px;
  font-weight: 500;
  position: relative;
  margin-bottom: 20px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 30px;
    border-radius: 5px;
    background: linear-gradient(135deg, #71b7e6, #9b59b6);
  }
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InputBox = styled.div`
  margin-bottom: 15px;
  width: calc(100% / 2 - 20px);

  @media (max-width: 584px) {
    width: 100%;
  }
`;

const Label = styled.span`
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Input = styled.input`
  height: 45px;
  width: 100%;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;

  &:focus,
  &:valid {
    border-color: #9b59b6;
  }
`;

const TextArea = styled.textarea`
  height: 100px;
  width: 100%;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;
  resize: none;

  &:focus,
  &:valid {
    border-color: #9b59b6;
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  margin: 35px 0 0 0;
`;

const Button = styled.button`
  height: 45px;
  width: 100%;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);

  &:hover {
    background: linear-gradient(-135deg, #71b7e6, #9b59b6);
  }
`;

const GameForm = ({ gameToEdit, onSave }) => {
  const [title, setTitle] = useState(gameToEdit ? gameToEdit.title : '');
  const [description, setDescription] = useState(gameToEdit ? gameToEdit.description : '');
  const [imageUrl, setImageUrl] = useState(gameToEdit ? gameToEdit.imageUrl : '');
  const [comments, setComments] = useState(gameToEdit ? gameToEdit.comments?.join(', ') : '');
  const [rating, setRating] = useState(gameToEdit ? gameToEdit.rating?.toString() : '');

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setComments('');
    setRating('');
  };

  const saveGame = async (newGame) => {
    const { error } = gameToEdit
      ? await supabase.from('Games').update(newGame).eq('id', gameToEdit.id)
      : await supabase.from('Games').insert([newGame]);

    if (error) {
      console.error('Error guardando el juego:', error.message);
    } else {
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
      comments: comments.split(',').map(c => c.trim()),
      rating: parseFloat(rating),
    };
    saveGame(newGame);
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Registrar Juego</Title>
        <Form onSubmit={handleSubmit}>
          <InputBox>
            <Label>Título</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </InputBox>

          <InputBox>
            <Label>URL de Imagen</Label>
            <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
          </InputBox>

          <InputBox style={{ width: '100%' }}>
            <Label>Descripción</Label>
            <TextArea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </InputBox>

          <InputBox>
            <Label>Comentarios</Label>
            <Input value={comments} onChange={(e) => setComments(e.target.value)} />
          </InputBox>

          <InputBox>
            <Label>Calificación</Label>
            <Input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
          </InputBox>

          <ButtonBox>
            <Button type="submit">Guardar Juego</Button>
          </ButtonBox>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default GameForm;
