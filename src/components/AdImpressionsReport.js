import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseConfig';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 24px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background: #f5f5f5;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background: #f9f9f9;
  }
`;

const DateFilter = styled.div`
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

const DateInput = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #2980b9;
  }
`;

const AdImpressionsReport = () => {
  const [impressions, setImpressions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchImpressions = async () => {
    // Trae todos los registros de ContadorAnuncios con el título del juego relacionado
    const { data, error } = await supabase
      .from('ContadorAnuncios')
      .select(`related_game_id, related_game:Games!ContadorAnuncios_related_game_id_fkey(title)`);

    if (error) {
      console.error('Error fetching impressions:', error);
      return;
    }

    // Agrupa y cuenta las impresiones por related_game_id
    const grouped = {};
    data.forEach((row) => {
      if (!grouped[row.related_game_id]) {
        grouped[row.related_game_id] = {
          title: row.related_game?.title || 'Desconocido',
          count: 0
        };
      }
      grouped[row.related_game_id].count += 1;
    });

    // Convierte a array y ordena por count descendente
    const sorted = Object.entries(grouped)
      .map(([id, obj]) => ({ id, ...obj }))
      .sort((a, b) => b.count - a.count);

    setImpressions(sorted);
  };

  useEffect(() => {
    fetchImpressions();
  }, []);

  return (
    <Container>
      <Title>Reporte de Anuncios Más Impresos</Title>
      <Table>
        <thead>
          <tr>
            <th>Juego Anuncio</th>
            <th>Número de Impresiones</th>
          </tr>
        </thead>
        <tbody>
          {impressions.map((impression) => (
            <tr key={impression.id}>
              <td>{impression.title}</td>
              <td>{impression.count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdImpressionsReport; 