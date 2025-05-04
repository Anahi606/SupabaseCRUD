import React from 'react';
import styled from 'styled-components';

const CategoryContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  width: 300px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const Content = styled.div`
  padding: 16px;
  text-align: center;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  margin: 0 0 8px 0;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
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

const CategoryItem = ({ category, onDelete, onEdit }) => {
  return (
    <CategoryContainer>
      <Content>
        <Title>{category.name || 'Sin nombre'}</Title>
        <ButtonGroup>
          <Button onClick={() => onEdit(category.id)}>Editar</Button>
          <Button onClick={() => onDelete(category.id)}>Eliminar</Button>
        </ButtonGroup>
      </Content>
    </CategoryContainer>
  );
};

export default CategoryItem; 