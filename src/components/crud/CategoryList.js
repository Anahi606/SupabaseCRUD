import React from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem';

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

const CategoryList = ({ categories, onDelete, onEdit }) => {
  return (
    <GridContainer>
      {categories && categories.length > 0 ? (
        categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      ) : (
        <Message>No hay categorías disponibles.</Message>
      )}
    </GridContainer>
  );
};

export default CategoryList; 