import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseConfig';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';

const MainBackground = styled.div`
  min-height: 100vh;
  background: #f3f3f3;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  h1 {
    font-size: 32px;
    color: #333;
  }

  button {
    background: #e74c3c;
    color: #fff;
    border: none;
    padding: 10px 16px;
    font-size: 14px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 30px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const GamesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
`;

const GameCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 200px;
  overflow: hidden;
  text-align: center;

  img {
    width: 100%;
    height: 240px;
    object-fit: cover;
  }

  h3 {
    font-size: 16px;
    margin: 12px 8px 4px;
    color: #222;
  }

  p {
    font-weight: bold;
    color: #e67e22;
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

const Games = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchGamesWithLowestPrice = async () => {
    const { data: gamesData, error: gamesError } = await supabase.from('Games').select('*');

    if (gamesError) {
      console.error('Error fetching games:', gamesError.message);
      return;
    }

    const { data: pricesData, error: pricesError } = await supabase.from('Prices_by_pages').select('*');

    if (pricesError) {
      console.error('Error fetching prices:', pricesError.message);
      return;
    }

    const gamesWithPrice = gamesData.map(game => {
      const prices = pricesData.filter(price => price.idgame === game.id);
      const minPrice = prices.length > 0 ? Math.min(...prices.map(p => parseFloat(p.price))) : null;
      return { ...game, minPrice };
    });

    setGames(gamesWithPrice);
  };

  useEffect(() => {
    fetchGamesWithLowestPrice();
  }, []);

  const filteredGames = games.filter(game =>
    game.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <MainBackground>
      <GlobalStyle />
      <Container>
        <Header>
          <h1>Explorar Juegos</h1>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </Header>

        <SearchInput
          type="text"
          placeholder="Buscar juego..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <GamesGrid>
          {filteredGames.map(game => (
            <GameCard key={game.id} onClick={() => navigate(`/game/${game.id}`)} style={{ cursor: 'pointer' }}>
            <img src={game.imageUrl} alt={game.title} />
            <h3>{game.title}</h3>
            <p>{game.minPrice ? `$${game.minPrice.toFixed(2)}` : 'No disponible'}</p>
          </GameCard>
          ))}
        </GamesGrid>
      </Container>
    </MainBackground>
  );
};

export default Games;
