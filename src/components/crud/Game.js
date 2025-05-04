import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalStyle from '../styles/GlobalStyle';
import GameForm from './GameForm';
import GameList from './GameList';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import PageForm from './PageForm';
import PageList from './PageList';
import Modal from './Modal';
import { supabase } from '../supabaseConfig';
import styled, { createGlobalStyle } from 'styled-components';

const MainBackground = styled.div`
  min-height: 100vh;
  background: #151f44;
  padding: 0;
  font-family: 'Poppins', sans-serif;
`;

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0 0 0;
`;

const Section = styled.div`
  background: #353c5a;
  border-radius: 18px;
  padding: 32px 32px 24px 32px;
  margin-bottom: 32px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;

  h1 {
    font-size: 40px;
    color: #e0e0e0;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    margin: 0;
  }

  button {
    background: none;
    color: #fff;
    border: none;
    padding: 10px 24px;
    font-size: 16px;
    border-radius: 8px;
    font-weight: 600;
    transition: background 0.2s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    cursor: pointer;
    &:hover {
      background: #232a45;
    }
  }
`;

const FlexRow = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 32px;
`;

const FlexCol = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const AddButton = styled.button`
  background: #4CAF50;
  color: #fff;
  border: none;
  padding: 10px 24px;
  font-size: 16px;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  cursor: pointer;
  margin-bottom: 24px;
  
  &:hover {
    background: #45a049;
  }
`;

const Games = () => {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pages, setPages] = useState([]);
  const [gameToEdit, setGameToEdit] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [pageToEdit, setPageToEdit] = useState(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchGames = async () => {
    const { data, error } = await supabase.from('Games').select('*');
    if (error) {
      console.error('Error fetching games:', error.message);
    } else {
      setGames(data);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('Category').select('*');
    if (error) {
      console.error('Error fetching categories:', error.message);
    } else {
      setCategories(data);
    }
  };

  const fetchPages = async () => {
    const { data, error } = await supabase.from('Pages').select('*');
    if (error) {
      console.error('Error fetching pages:', error.message);
    } else {
      setPages(data);
    }
  };

  useEffect(() => {
    fetchGames();
    fetchCategories();
    fetchPages();
  }, []);

  const handleSaveGame = (game) => {
    if (!game) {
      console.error('Game object is null or undefined');
      return;
    }

    if (gameToEdit) {
      const updateGame = async () => {
        const { error } = await supabase
          .from('Games')
          .update(game)
          .eq('id', gameToEdit.id);
        if (error) {
          console.error('Error updating game:', error.message);
        } else {
          await fetchGames();
          setGameToEdit(null);
        }
      };
      updateGame();
    } else {
      const refetchGame = async () => { await fetchGames(); };
      refetchGame();
    }
  };

  const handleSaveCategory = (category) => {
    if (!category) {
      console.error('Category object is null or undefined');
      return;
    }

    if (categoryToEdit) {
      const updateCategory = async () => {
        const { error } = await supabase
          .from('Category')
          .update(category)
          .eq('id', categoryToEdit.id);
        if (error) {
          console.error('Error updating category:', error.message);
        } else {
          await fetchCategories();
          setCategoryToEdit(null);
        }
      };
      updateCategory();
    } else {
      const refetchCategory = async () => { await fetchCategories(); };
      refetchCategory();
    }
  };

  const handleSavePage = (page) => {
    if (!page) {
      console.error('Page object is null or undefined');
      return;
    }

    if (pageToEdit) {
      const updatePage = async () => {
        const { error } = await supabase
          .from('Pages')
          .update(page)
          .eq('id', pageToEdit.id);
        if (error) {
          console.error('Error updating page:', error.message);
        } else {
          await fetchPages();
          setPageToEdit(null);
        }
      };
      updatePage();
    } else {
      const refetchPage = async () => { await fetchPages(); };
      refetchPage();
    }
  };

  const handleDeleteGame = async (id) => {
    const { error } = await supabase.from('Games').delete().eq('id', id);
    if (error) {
      console.error('Error deleting game:', error.message);
    } else {
      setGames(games.filter((game) => game.id !== id));
    }
  };

  const handleDeleteCategory = async (id) => {
    const { error } = await supabase.from('Category').delete().eq('id', id);
    if (error) {
      console.error('Error deleting category:', error.message);
    } else {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  const handleDeletePage = async (id) => {
    const { error } = await supabase.from('Pages').delete().eq('id', id);
    if (error) {
      console.error('Error deleting page:', error.message);
    } else {
      setPages(pages.filter((page) => page.id !== id));
    }
  };

  const handleEditGame = (id) => {
    const game = games.find((game) => game.id === id);
    setGameToEdit(game);
    setIsGameModalOpen(true);
  };

  const handleEditCategory = (id) => {
    const category = categories.find((category) => category.id === id);
    setCategoryToEdit(category);
    setIsCategoryModalOpen(true);
  };

  const handleEditPage = (id) => {
    const page = pages.find((page) => page.id === id);
    setPageToEdit(page);
    setIsPageModalOpen(true);
  };

  const handleAddGame = () => {
    setGameToEdit(null);
    setIsGameModalOpen(true);
  };

  const handleAddCategory = () => {
    setCategoryToEdit(null);
    setIsCategoryModalOpen(true);
  };

  const handleAddPage = () => {
    setPageToEdit(null);
    setIsPageModalOpen(true);
  };

  const handleCloseGameModal = () => {
    setIsGameModalOpen(false);
    setGameToEdit(null);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setCategoryToEdit(null);
  };

  const handleClosePageModal = () => {
    setIsPageModalOpen(false);
    setPageToEdit(null);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al intentar salir de cuenta:', error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <MainBackground>
      <GlobalStyle />
      <AdminContainer>
        <Header>
          <h1>Administración</h1>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </Header>
        <Section>
          <SectionTitle>Juegos</SectionTitle>
          <AddButton onClick={handleAddGame}>Agregar Juego</AddButton>
          <GameList games={games} onDelete={handleDeleteGame} onEdit={handleEditGame} />
        </Section>
        <FlexRow>
          <FlexCol>
            <Section>
              <SectionTitle>Categorías</SectionTitle>
              <AddButton onClick={handleAddCategory}>Agregar Categoría</AddButton>
              <CategoryList categories={categories} onDelete={handleDeleteCategory} onEdit={handleEditCategory} />
            </Section>
          </FlexCol>
          <FlexCol>
            <Section>
              <SectionTitle>Páginas Web</SectionTitle>
              <AddButton onClick={handleAddPage}>Agregar Página</AddButton>
              <PageList pages={pages} onDelete={handleDeletePage} onEdit={handleEditPage} />
            </Section>
          </FlexCol>
        </FlexRow>
        <Modal isOpen={isGameModalOpen} onClose={handleCloseGameModal}>
          <GameForm 
            gameToEdit={gameToEdit} 
            onSave={handleSaveGame} 
            onClose={handleCloseGameModal}
            categories={categories}
            pages={pages}
          />
        </Modal>
        <Modal isOpen={isCategoryModalOpen} onClose={handleCloseCategoryModal}>
          <CategoryForm 
            categoryToEdit={categoryToEdit} 
            onSave={handleSaveCategory} 
            onClose={handleCloseCategoryModal}
          />
        </Modal>
        <Modal isOpen={isPageModalOpen} onClose={handleClosePageModal}>
          <PageForm 
            pageToEdit={pageToEdit} 
            onSave={handleSavePage} 
            onClose={handleClosePageModal}
          />
        </Modal>
      </AdminContainer>
    </MainBackground>
  );
};

export default Games;
