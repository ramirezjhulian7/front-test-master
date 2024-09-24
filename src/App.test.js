import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock de los componentes hijos para aislar las pruebas de App
jest.mock('./components/SearchBar/SearchBar', () => ({ value, onChange }) => (
  <input
    data-testid="search-bar"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
));

jest.mock('./components/ImageGrid/ImageGrid', () => ({ searchTerm }) => (
  <div data-testid="image-grid">Search Term: {searchTerm}</div>
));

describe('App Component', () => {
  test('renderiza los componentes SearchBar y ImageGrid correctamente', () => {
    render(<App />);

    const searchBar = screen.getByTestId('search-bar');
    const imageGrid = screen.getByTestId('image-grid');

    expect(searchBar).toBeInTheDocument();
    expect(imageGrid).toBeInTheDocument();
  });

  test('actualiza el estado searchTerm cuando el usuario escribe en SearchBar', async () => {
    render(<App />);
    const searchBar = screen.getByTestId('search-bar');
    const imageGrid = screen.getByTestId('image-grid');

    await userEvent.type(searchBar, 'React Testing');

    expect(searchBar).toHaveValue('React Testing');
    expect(imageGrid).toHaveTextContent('Search Term: React Testing');
  });
});
