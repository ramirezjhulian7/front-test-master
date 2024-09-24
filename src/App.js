import React, { useState } from 'react';
import ImageGrid from './components/ImageGrid/ImageGrid';
import SearchBar from './components/SearchBar/SearchBar';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Estilos globales, reset CSS, etc. */
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;

const Container = styled.div`
  padding: 20px;
  /* Ajustar según diseño web.psd y mobile.psd */
`;

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <GlobalStyle />
      <Container>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <ImageGrid searchTerm={searchTerm} />
      </Container>
    </>
  );
}

export default App;
