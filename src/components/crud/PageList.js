import React from 'react';
import styled from 'styled-components';
import PageItem from './PageItem';

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

const PageList = ({ pages, onDelete, onEdit }) => {
  return (
    <GridContainer>
      {pages && pages.length > 0 ? (
        pages.map((page) => (
          <PageItem
            key={page.id}
            page={page}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      ) : (
        <Message>No hay páginas disponibles.</Message>
      )}
    </GridContainer>
  );
};

export default PageList; 