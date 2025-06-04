import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseConfig';
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

const PopupOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: #353b50;
  color: #fff;
  padding: 32px 24px;
  border-radius: 16px;
  max-width: 400px;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
`;

const PopupButton = styled.button`
  margin-top: 18px;
  padding: 10px 24px;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
`;

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [prices, setPrices] = useState([]);
  const [relatedGame, setRelatedGame] = useState(null);
  const [relatedPrice, setRelatedPrice] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

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

      if (gameData?.category_id) {
        const { data: relatedGames } = await supabase
          .from('Games')
          .select('*')
          .eq('category_id', gameData.category_id)
          .neq('id', id)
          .limit(1);

        if (relatedGames && relatedGames.length > 0) {
          setRelatedGame(relatedGames[0]);
          const { data: relatedPrices } = await supabase
            .from('Prices_by_pages')
            .select('*, Pages(nameWeb, url)')
            .eq('idgame', relatedGames[0].id);
          if (relatedPrices && relatedPrices.length > 0) {
            const minPrice = relatedPrices.reduce((min, curr) => parseFloat(curr.price) < parseFloat(min.price) ? curr : min, relatedPrices[0]);
            setRelatedPrice(minPrice);
          }
        }
      }
    };

    fetchDetails();
  }, [id]);

  if (!game) return <p>Cargando...</p>;

  return (
    <>
      {showPopup && relatedGame && relatedPrice && (
        <PopupOverlay>
          <PopupContent>
            <CloseButton onClick={() => setShowPopup(false)}>×</CloseButton>
            <h2>Anuncio relacionado</h2>
            <img src={relatedGame.imageUrl} alt={relatedGame.title} style={{ width: '100%', borderRadius: 8, marginBottom: 12 }} />
            <p>
              ¿Te interesa también <b>{relatedGame.title}</b>?<br />
              Disponible en <b>{relatedPrice.Pages?.nameWeb}</b> por <span style={{ color: '#ff4d4f' }}>${parseFloat(relatedPrice.price).toFixed(2)}</span>
            </p>
            <PopupButton onClick={() => {
              setShowPopup(false);
              navigate(`/game/${relatedGame.id}`);
            }}>
              Mirar ahora
            </PopupButton>
          </PopupContent>
        </PopupOverlay>
      )}
      <Container>
        <Title>{game.title}</Title>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontWeight: 'bold' }}>Rating:</span> {game.rating}
        </div>
        <Image src={game.imageUrl} alt={game.title} />
        <Description><span style={{ fontWeight: 'bold' }}>Descripcion:</span> {game.description}</Description>

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
    </>
  );
};

export default GameDetails;
