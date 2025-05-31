import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseConfig';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 16px;
`;

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #444;
  margin-bottom: 32px;
`;

const PriceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;

  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background: #f5f5f5;
  }
`;

const BackButton = styled.button`
  margin-top: 24px;
  padding: 10px 16px;
  font-size: 14px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const { data: gameData } = await supabase.from('Games').select('*').eq('id', id).single();
      setGame(gameData);

      const { data: priceData, error } = await supabase
        .from('Prices_by_pages')
        .select('*, Pages(nameWeb, url)')
        .eq('idgame', id);

      if (error) console.error(error);
      else setPrices(priceData);
    };

    fetchDetails();
  }, [id]);

  if (!game) return <p>Cargando...</p>;

  return (
    <Container>
      <Title>{game.title}</Title>
      <Image src={game.imageUrl} alt={game.title} />
      <Description>{game.description}</Description>

      <h2>Precios en distintas páginas:</h2>
      <PriceTable>
        <thead>
          <tr>
            <th>Página</th>
            <th>Precio</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.Pages?.nameWeb || 'Desconocido'}</td>
              <td>${parseFloat(entry.price).toFixed(2)}</td>
              <td>
                <a href={entry.Pages?.url} target="_blank" rel="noreferrer">
                  Ir al sitio
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </PriceTable>

      <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
    </Container>
  );
};

export default GameDetails;
