import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageGrid from './ImageGrid';
import { fetchImages } from '../../services/api';

// Mock de fetchImages para que no haga llamadas reales a la API
jest.mock('../../services/api', () => ({
  fetchImages: jest.fn(),
}));

// Mock del componente ImageCard
jest.mock('../ImageCard/ImageCard', () => ({ image, onLikeToggle }) => (
  <div data-testid="image-card">{image.title}</div>
));

describe('ImageGrid component', () => {
  const mockImages = [
    { id: 1, title: 'Image 1', liked: false, likes_count: 10 },
    { id: 2, title: 'Image 2', liked: true, likes_count: 20 },
  ];

  beforeEach(() => {
    fetchImages.mockResolvedValue({ data: mockImages });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar correctamente con imágenes cargadas', async () => {
    render(<ImageGrid searchTerm="" />);

    // Verificamos si se muestra el mensaje de carga inicialmente
    expect(screen.getByText('Cargando...')).toBeInTheDocument();

    // Esperamos a que se carguen las imágenes mockeadas
    await waitFor(() => {
      expect(fetchImages).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Image 1')).toBeInTheDocument();
      expect(screen.getByText('Image 2')).toBeInTheDocument();
    });
  });

  it('debería filtrar las imágenes basadas en el searchTerm', async () => {
    render(<ImageGrid searchTerm="Image 1" />);

    await waitFor(() => {
      expect(screen.getByText('Image 1')).toBeInTheDocument();
    });

    // Aseguramos que solo la imagen filtrada esté en el documento
    expect(screen.queryByText('Image 2')).not.toBeInTheDocument();
  });

  it('debería cargar más imágenes al hacer scroll', async () => {
    render(<ImageGrid searchTerm="" />);

    // Esperamos a que se carguen las imágenes iniciales
    await waitFor(() => {
      expect(fetchImages).toHaveBeenCalledTimes(1);
    });

    // Simulamos un scroll infinito (se llama loadImages nuevamente)
    fireEvent.scroll(window, { target: { scrollY: 100 } });

    // Verificamos que fetchImages haya sido llamado para cargar más imágenes
    await waitFor(() => {
      expect(fetchImages).toHaveBeenCalledTimes(2);
    });
  });

  it('debería mostrar el mensaje de "No hay más imágenes" cuando no haya más imágenes por cargar', async () => {
    fetchImages.mockResolvedValueOnce({ data: [] }); // Simulamos que no hay más imágenes

    render(<ImageGrid searchTerm="" />);

    // Simulamos un scroll infinito
    fireEvent.scroll(window, { target: { scrollY: 100 } });

    // Verificamos si se muestra el mensaje de fin
    await waitFor(() => {
      expect(screen.getByText('No hay más imágenes.')).toBeInTheDocument();
    });
  });
});
