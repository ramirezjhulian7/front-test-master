import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

// Mock para el ícono FaSearch (si no deseas testear íconos como FaSearch)
jest.mock('react-icons/fa', () => ({
  FaSearch: () => <svg data-testid="fa-search" />,
}));

describe('SearchBar component', () => {
  const mockOnChange = jest.fn(); // Creamos un mock para la función onChange

  it('debería renderizar correctamente el logo y el input de búsqueda', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    // Verificamos si el logo está en el documento
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();

    // Verificamos si el input está en el documento
    const input = screen.getByPlaceholderText("You're looking for something?");
    expect(input).toBeInTheDocument();

    // Verificamos si el ícono FaSearch está en el documento
    const searchIcon = screen.getByTestId('fa-search');
    expect(searchIcon).toBeInTheDocument();
  });

  it('debería mostrar el valor pasado como prop en el input', () => {
    const testValue = 'React testing';
    render(<SearchBar value={testValue} onChange={mockOnChange} />);

    // Verificamos si el input tiene el valor correcto
    const input = screen.getByPlaceholderText("You're looking for something?");
    expect(input).toHaveValue(testValue);
  });

  it('debería llamar a onChange cuando el valor del input cambia', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);

    // Obtenemos el input
    const input = screen.getByPlaceholderText("You're looking for something?");

    // Simulamos el cambio de valor en el input
    fireEvent.change(input, { target: { value: 'nuevo valor' } });

    // Verificamos si onChange fue llamado con el valor correcto
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('nuevo valor');
  });
});
