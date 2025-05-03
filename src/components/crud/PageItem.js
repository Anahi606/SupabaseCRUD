import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
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

const Url = styled.a`
  display: block;
  color: #007bff;
  text-decoration: none;
  margin: 8px 0;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
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

const PageItem = ({ page, onDelete, onEdit }) => {
  return (
    <PageContainer>
      <Content>
        <Title>{page.nameWeb || 'Sin nombre'}</Title>
        <Url href={page.url} target="_blank" rel="noopener noreferrer">
          {page.url || 'Sin URL'}
        </Url>
        <ButtonGroup>
          <Button onClick={() => onEdit(page.id)}>Editar</Button>
          <Button onClick={() => onDelete(page.id)}>Eliminar</Button>
        </ButtonGroup>
      </Content>
    </PageContainer>
  );
};

export default PageItem; 