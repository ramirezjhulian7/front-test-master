// src/components/ImageCard/ImageCard.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageCard from './ImageCard';
import { likeImage } from '../../services/api';

// Mock de la función likeImage
jest.mock('../../services/api', () => ({
  likeImage: jest.fn(),
}));

describe('ImageCard Component', () => {
  const mockImage = {
    id: 1,
    title: 'Beautiful Landscape',
    author: 'John Doe',
    liked: false,
    likes_count: 10,
    price: 150,
    main_attachment: {
      small: 'https://example.com/image1-small.jpg',
    },
  };

  const mockOnLikeToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente con las props proporcionadas', () => {
    render(<ImageCard image={mockImage} onLikeToggle={mockOnLikeToggle} />);

    // Verificar que la imagen se renderiza
    const imageElement = screen.getByAltText(/beautiful landscape/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockImage.main_attachment.small);

    // Verificar el título
    const titleElement = screen.getByText(/beautiful landscape/i);
    expect(titleElement).toBeInTheDocument();

    // Verificar el autor
    const byElement = screen.getByText(/by/i);
    const authorElement = screen.getByText(/john doe/i);
    expect(byElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();

    // Verificar el precio
    const priceElement = screen.getByText(/150 €/i);
    expect(priceElement).toBeInTheDocument();

    // Verificar el contador de likes
    const likesElement = screen.getByText(/10/i);
    expect(likesElement).toBeInTheDocument();

    // Verificar que los botones de like están en el documento con aria-label="like"
    const likeButtonWeb = screen.getByRole('button', { name: /like/i });
    const likeButtons = screen.getAllByRole('button', { name: /like/i });
    expect(likeButtonWeb).toBeInTheDocument();
    expect(likeButtons.length).toBe(2); // Asegurar que hay dos botones de like
  });

  test('llama a likeImage y actualiza el estado al hacer clic en el botón de like', async () => {
    // Configurar el mock para que likeImage resuelva exitosamente
    likeImage.mockResolvedValueOnce({ data: { message: 'Liked successfully' } });

    render(<ImageCard image={mockImage} onLikeToggle={mockOnLikeToggle} />);

    const likeButtonWeb = screen.getByRole('button', { name: /like/i });

    // Hacer clic en el botón de like
    userEvent.click(likeButtonWeb);

    // Verificar que likeImage fue llamada con el id correcto
    expect(likeImage).toHaveBeenCalledWith(mockImage.id);

    // Esperar a que se actualice el DOM
    await waitFor(() => {
      // Verificar que el contador de likes ha aumentado
      const updatedLikesElement = screen.getByText(/11/i);
      expect(updatedLikesElement).toBeInTheDocument();

      // Verificar que el botón de like ahora está en estado "liked"
      expect(likeButtonWeb).toHaveStyle('background-color: #63e3b1');

      // Verificar que onLikeToggle fue llamado con los argumentos correctos
      expect(mockOnLikeToggle).toHaveBeenCalledWith(mockImage.id, true);
    });
  });

  test('actualiza el estado correctamente al deshacer el like', async () => {
    const likedImage = { ...mockImage, liked: true, likes_count: 10 };

    // Configurar el mock para que likeImage resuelva exitosamente
    likeImage.mockResolvedValueOnce({ data: { message: 'Unliked successfully' } });

    render(<ImageCard image={likedImage} onLikeToggle={mockOnLikeToggle} />);

    const likeButtonWeb = screen.getByRole('button', { name: /like/i });

    // Hacer clic en el botón de like para deshacer el like
    userEvent.click(likeButtonWeb);

    // Verificar que likeImage fue llamada con el id correcto
    expect(likeImage).toHaveBeenCalledWith(likedImage.id);

    // Esperar a que se actualice el DOM
    await waitFor(() => {
      // Verificar que el contador de likes ha disminuido
      const updatedLikesElement = screen.getByText(/9/i);
      expect(updatedLikesElement).toBeInTheDocument();

      // Verificar que el botón de like ahora está en estado "not liked"
      expect(likeButtonWeb).toHaveStyle('background-color: grey');

      // Verificar que onLikeToggle fue llamado con los argumentos correctos
      expect(mockOnLikeToggle).toHaveBeenCalledWith(likedImage.id, false);
    });
  });

  test('maneja errores correctamente cuando likeImage falla', async () => {
    // Configurar el mock para que likeImage rechace con un error
    likeImage.mockRejectedValueOnce(new Error('Network Error'));

    // Mockear console.error para evitar que el error se muestre en la consola durante las pruebas
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<ImageCard image={mockImage} onLikeToggle={mockOnLikeToggle} />);

    const likeButtonWeb = screen.getByRole('button', { name: /like/i });

    // Hacer clic en el botón de like
    userEvent.click(likeButtonWeb);

    // Verificar que likeImage fue llamada con el id correcto
    expect(likeImage).toHaveBeenCalledWith(mockImage.id);

    // Esperar a que se maneje el error
    await waitFor(() => {
      // Verificar que el contador de likes no ha cambiado
      const likesElement = screen.getByText(/10/i);
      expect(likesElement).toBeInTheDocument();

      // Verificar que el estado de "liked" no ha cambiado
      expect(likeButtonWeb).toHaveStyle('background-color: grey');

      // Verificar que onLikeToggle no fue llamado
      expect(mockOnLikeToggle).not.toHaveBeenCalled();

      // Verificar que console.error fue llamado
      expect(console.error).toHaveBeenCalledWith('Error al dar like:', expect.any(Error));
    });

    // Restaurar console.error
    console.error.mockRestore();
  });
});
