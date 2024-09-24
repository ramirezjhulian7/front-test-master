import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageCard from './ImageCard'; // Asegúrate de que la ruta sea correcta
import { likeImage } from '../../services/api';

// Mock de la API likeImage para evitar llamadas reales
jest.mock('../../services/api', () => ({
  likeImage: jest.fn(),
}));

describe('ImageCard component', () => {
  const mockImage = {
    id: 1,
    title: 'Beautiful Landscape',
    author: 'John Doe',
    liked: false,
    likes_count: 10,
    price: 100,
    main_attachment: {
      small: 'https://example.com/image.jpg',
    },
  };

  const mockOnLikeToggle = jest.fn(); // Mock para la función onLikeToggle

  it('debería renderizar correctamente el contenido de la tarjeta', () => {
    render(<ImageCard image={mockImage} onLikeToggle={mockOnLikeToggle} />);

    // Verificar que la imagen se renderice correctamente
    const img = screen.getByAltText(mockImage.title);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockImage.main_attachment.small);

    // Verificar que el título y el autor se muestren
    expect(screen.getByText(mockImage.title)).toBeInTheDocument();
    expect(screen.getByText(mockImage.author)).toBeInTheDocument();

    // Verificar el precio
    expect(screen.getByText(`${mockImage.price} €`)).toBeInTheDocument();

    // Verificar que hay múltiples elementos con el texto '10' (likes en web y móvil)
    const likeCounts = screen.getAllByText('10');
    expect(likeCounts).toHaveLength(2);
  });

  it('debería llamar a la función onLikeToggle y likeImage al hacer click en el botón de "like"', async () => {
    likeImage.mockResolvedValueOnce({}); // Mockeamos que la llamada a likeImage tenga éxito

    render(<ImageCard image={mockImage} onLikeToggle={mockOnLikeToggle} />);

    // Simulamos el clic en el botón de "like"
    const likeButton = screen.getByTestId('like-button-web');
    fireEvent.click(likeButton);

    // Esperamos que se llame a likeImage y onLikeToggle
    await waitFor(() => {
      expect(likeImage).toHaveBeenCalledWith(mockImage.id);
      expect(mockOnLikeToggle).toHaveBeenCalledWith(mockImage.id, true);
    });
  });
});
