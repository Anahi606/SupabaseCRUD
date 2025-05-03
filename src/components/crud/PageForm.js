import React, { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabaseConfig';

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
  width: 100%;
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

const PageForm = ({ pageToEdit, onSave, onClose }) => {
  const [nameWeb, setNameWeb] = useState(pageToEdit ? pageToEdit.nameWeb : '');
  const [url, setUrl] = useState(pageToEdit ? pageToEdit.url : '');

  const resetForm = () => {
    setNameWeb('');
    setUrl('');
  };

  const savePage = async (newPage) => {
    const { error } = pageToEdit
      ? await supabase.from('Pages').update(newPage).eq('id', pageToEdit.id)
      : await supabase.from('Pages').insert([newPage]);

    if (error) {
      console.error('Error guardando la página:', error.message);
    } else {
      onSave(newPage);
      resetForm();
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPage = {
      nameWeb,
      url,
    };
    savePage(newPage);
  };

  return (
    <FormWrapper>
      <Title>{pageToEdit ? 'Editar Página' : 'Registrar Página'}</Title>
      <Form onSubmit={handleSubmit}>
        <InputBox>
          <Label>Nombre de la Web</Label>
          <Input value={nameWeb} onChange={(e) => setNameWeb(e.target.value)} required />
        </InputBox>

        <InputBox>
          <Label>URL</Label>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} required />
        </InputBox>

        <ButtonBox>
          <Button type="submit">Guardar Página</Button>
        </ButtonBox>
      </Form>
    </FormWrapper>
  );
};

export default PageForm; 