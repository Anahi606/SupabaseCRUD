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
  const [pageNames, setPageNames] = useState({});
  const [gamePrices, setGamePrices] = useState([]);

  useEffect(() => {
    const fetchPageNames = async () => {
      const { data, error } = await supabase
        .from('Pages')
        .select('id, nameWeb');

      if (error) {
        console.error('Error fetching page names:', error.message);
      } else {
        const namesMap = {};
        data.forEach(page => {
          namesMap[page.id] = page.nameWeb;
        });
        setPageNames(namesMap);
      }
    };

    const fetchGamePrices = async () => {
      const { data, error } = await supabase
        .from('Prices_by_pages')
        .select('*')
        .eq('idgame', gameId);

      if (error) {
        console.error('Error fetching game prices:', error.message);
      } else {
        setGamePrices(data);
        onPricesChange(data);
      }
    };

    fetchPageNames();
    fetchGamePrices();
  }, [gameId]);

  const handleAddPrice = async () => {
    if (!selectedPage || !price) return;
  
    const existingPrice = gamePrices.find(p => p.idpage == selectedPage);
    console.log('selectedPage', selectedPage);
    console.log('gamePrices', gamePrices);
    console.log('existingPrice', existingPrice);

    if (existingPrice) {
      const { error: deleteError } = await supabase
        .from('Prices_by_pages')
        .delete()
        .eq('id', existingPrice.id);
  
      if (deleteError) {
        console.error('Error deleting existing price before insert:', deleteError.message);
        return;
      }
    }
  
    const { data, error } = await supabase
      .from('Prices_by_pages')
      .insert([{ idgame: gameId, idpage: selectedPage, price: parseFloat(price) }])
      .select();
  
    if (error) {
      console.error('Error adding price:', error.message);
    } else {
      const updatedPrices = existingPrice
        ? [...gamePrices.filter(p => p.id !== existingPrice.id), data[0]]
        : [...gamePrices, data[0]];
      setGamePrices(updatedPrices);
      onPricesChange(updatedPrices);
      setSelectedPage('');
      setPrice('');
    }
  };
  

  const handleDeletePrice = async (priceId) => {
    const { error } = await supabase
      .from('Prices_by_pages')
      .delete()
      .eq('id', priceId);

    if (error) {
      console.error('Error deleting price:', error.message);
    } else {
      const updatedPrices = gamePrices.filter(p => p.id !== priceId);
      setGamePrices(updatedPrices);
      onPricesChange(updatedPrices);
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
          {gamePrices.map((price) => (
            <TableRow key={price.id}>
              <TableCell>{pageNames[price.idpage] || 'Página no encontrada'}</TableCell>
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