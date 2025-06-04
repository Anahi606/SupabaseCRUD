import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabaseConfig';
import PriceTable from './PriceTable';
import Modal from './Modal';

const FormWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
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

const Select = styled.select`
  height: 45px;
  width: 100%;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;
  background-color: white;

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

const ErrorMessage = styled.div`
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const GameForm = ({ gameToEdit, onSave, onClose, categories, pages }) => {
  const [title, setTitle] = useState(gameToEdit ? gameToEdit.title : '');
  const [description, setDescription] = useState(gameToEdit ? gameToEdit.description : '');
  const [imageUrl, setImageUrl] = useState(gameToEdit ? gameToEdit.imageUrl : '');
  const [comments, setComments] = useState(gameToEdit ? gameToEdit.comments?.join(', ') : '');
  const [rating, setRating] = useState(gameToEdit ? gameToEdit.rating?.toString() : '');
  const [categoryId, setCategoryId] = useState(gameToEdit ? gameToEdit.category_id : '');
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    if (gameToEdit) {
      const fetchPrices = async () => {
        const { data, error } = await supabase
          .from('Prices')
          .select('*, page:Pages(*)')
          .eq('gameid', gameToEdit.id);

        if (error) {
          console.error('Error fetching prices:', error.message);
        } else {
          setPrices(data);
        }
      };
      fetchPrices();
    }
  }, [gameToEdit]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setComments('');
    setRating('');
    setCategoryId('');
    setPrices([]);
  };

  const saveGame = async (newGame) => {
    let gameId;
    
    if (gameToEdit) {
      const { error } = await supabase
        .from('Games')
        .update(newGame)
        .eq('id', gameToEdit.id);
      
      if (error) {
        console.log(error, "error");
        setError(error);
        setIsErrorModalOpen(true);
        return;
      }
      gameId = gameToEdit.id;
    } else {
      const { data, error } = await supabase
        .from('Games')
        .insert([newGame])
        .select();
      
      if (error) {
        console.log(error, "error");
        setError(error);
        setIsErrorModalOpen(true);
        return;
      }
      gameId = data[0].id;
    }

    const currentPriceIds = prices.map(p => p.id);
    const { error: deleteError } = await supabase
      .from('Prices')
      .delete()
      .eq('gameid', gameId)
      .not('id', 'in', `(${currentPriceIds.join(',')})`);

    if (deleteError) {
      console.error('Error deleting old prices:', deleteError.message);
    }

    onSave(newGame);
    resetForm();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGame = {
      title,
      description,
      imageUrl,
      comments: comments.split(',').map(c => c.trim()),
      rating: parseFloat(rating),
      category_id: categoryId || null,
    };
    saveGame(newGame);
  };

  return (
    <>
      <FormWrapper>
        <Title>{gameToEdit ? 'Editar Juego' : 'Registrar Juego'}</Title>
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
            <Label>Categoría</Label>
            <Select 
              value={categoryId} 
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Seleccione una categoría</option>
              {categories && categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </InputBox>

          <InputBox>
            <Label>Comentarios</Label>
            <Input value={comments} onChange={(e) => setComments(e.target.value)} />
          </InputBox>

          <InputBox>
            <Label>Calificación</Label>
            <Input 
              type="number" 
              value={rating} 
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 5)) {
                  setRating(value);
                }
              }}
              min="0"
              max="5"
              step="0.1"
            />
          </InputBox>

          <ButtonBox>
            <Button type="submit">Guardar Juego</Button>
          </ButtonBox>
        </Form>
        {gameToEdit && (
          <PriceTable
            gameId={gameToEdit.id}
            pages={pages}
            prices={prices}
            onPricesChange={setPrices}
          />
        )}
      </FormWrapper>

      <Modal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)}>
        <ErrorMessage>
          <h3>Error {error?.code}</h3>
          <p>{error?.details || error?.message}</p>
        </ErrorMessage>
      </Modal>
    </>
  );
};

export default GameForm;
