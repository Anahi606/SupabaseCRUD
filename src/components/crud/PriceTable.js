import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabaseConfig';

const TableContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const TableHeader = styled.th`
  background-color: #f5f5f5;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const Input = styled.input`
  height: 35px;
  width: 100px;
  outline: none;
  font-size: 14px;
  border-radius: 5px;
  padding-left: 10px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;

  &:focus,
  &:valid {
    border-color: #9b59b6;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #cc0000;
  }
`;

const AddPriceContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  align-items: center;
`;

const Select = styled.select`
  height: 35px;
  width: 200px;
  outline: none;
  font-size: 14px;
  border-radius: 5px;
  padding-left: 10px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;
  background-color: white;

  &:focus,
  &:valid {
    border-color: #9b59b6;
  }
`;

const AddButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #45a049;
  }
`;

const PriceTable = ({ gameId, pages, prices, onPricesChange }) => {
  const [selectedPage, setSelectedPage] = useState('');
  const [price, setPrice] = useState('');

  const handleAddPrice = async () => {
    if (!selectedPage || !price) return;

    const { error } = await supabase
      .from('Prices')
      .insert([{ gameid: gameId, pageid: selectedPage, price: parseFloat(price) }]);

    if (error) {
      console.error('Error adding price:', error.message);
    } else {
      const newPrice = {
        id: Date.now(), // Temporary ID until we get the real one from the database
        gameid: gameId,
        pageid: selectedPage,
        price: parseFloat(price),
        page: pages.find(p => p.id === selectedPage)
      };
      onPricesChange([...prices, newPrice]);
      setSelectedPage('');
      setPrice('');
    }
  };

  const handleDeletePrice = async (priceId) => {
    const { error } = await supabase
      .from('Prices')
      .delete()
      .eq('id', priceId);

    if (error) {
      console.error('Error deleting price:', error.message);
    } else {
      onPricesChange(prices.filter(p => p.id !== priceId));
    }
  };

  return (
    <TableContainer>
      <h3>Precios por Página</h3>
      <Table>
        <thead>
          <tr>
            <TableHeader>Página</TableHeader>
            <TableHeader>Precio</TableHeader>
            <TableHeader>Acciones</TableHeader>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <TableRow key={price.id}>
              <TableCell>{price.page?.nameWeb || 'Página no encontrada'}</TableCell>
              <TableCell>${price.price.toFixed(2)}</TableCell>
              <TableCell>
                <DeleteButton onClick={() => handleDeletePrice(price.id)}>
                  Eliminar
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <AddPriceContainer>
        <Select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
        >
          <option value="">Seleccione una página</option>
          {pages.map((page) => (
            <option key={page.id} value={page.id}>
              {page.nameWeb}
            </option>
          ))}
        </Select>
        <Input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          step="0.01"
        />
        <AddButton onClick={handleAddPrice}>Agregar Precio</AddButton>
      </AddPriceContainer>
    </TableContainer>
  );
};

export default PriceTable; 