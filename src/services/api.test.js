jest.mock('axios', () => {
  // Crear mocks para los métodos 'get' y 'post'
  const mockGet = jest.fn();
  const mockPost = jest.fn();

  return {
    create: jest.fn(() => ({
      get: mockGet,
      post: mockPost,
    })),
  };
});

import axios from 'axios';
import { fetchImages, likeImage } from './api';


const mockGet = axios.create().get;
const mockPost = axios.create().post;

describe('API Service - fetchImages', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('realiza una solicitud GET a /images con los parámetros correctos y retorna los datos', async () => {
    const mockData = {
      data: {
        results: [
          { id: 1, url: 'https://example.com/image1.jpg' },
          { id: 2, url: 'https://example.com/image2.jpg' },
        ],
      },
    };

    // Configurar el mock para que axios.get resuelva con mockData
    mockGet.mockResolvedValueOnce(mockData);

    const searchTerm = 'Nature';
    const page = 2;

    const response = await fetchImages(searchTerm, page);

    // Verificar que axios.get fue llamado con la URL y los parámetros correctos
    expect(mockGet).toHaveBeenCalledWith('/images', {
      params: { search: searchTerm, page },
    });

    // Verificar que la respuesta es la esperada
    expect(response).toEqual(mockData);
  });

  test('maneja errores correctamente cuando la solicitud falla', async () => {
    const mockError = new Error('Network Error');

    // Configurar el mock para que axios.get rechace con mockError
    mockGet.mockRejectedValueOnce(mockError);

    const searchTerm = 'Nature';
    const page = 2;

    // Usar expect con async/await para capturar el error
    await expect(fetchImages(searchTerm, page)).rejects.toThrow('Network Error');

    // Verificar que axios.get fue llamado con la URL y los parámetros correctos
    expect(mockGet).toHaveBeenCalledWith('/images', {
      params: { search: searchTerm, page },
    });
  });

  test('usa los valores por defecto cuando no se proporcionan argumentos', async () => {
    const mockData = {
      data: {
        results: [
          { id: 1, url: 'https://example.com/image1.jpg' },
          { id: 2, url: 'https://example.com/image2.jpg' },
        ],
      },
    };

    mockGet.mockResolvedValueOnce(mockData);

    const response = await fetchImages();

    expect(mockGet).toHaveBeenCalledWith('/images', {
      params: { search: '', page: 1 },
    });

    expect(response).toEqual(mockData);
  });
});

describe('API Service - likeImage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('realiza una solicitud POST a /images/{id}/likes y retorna los datos', async () => {
    const mockResponse = {
      data: {
        message: 'Image liked successfully',
      },
    };

    // Configurar el mock para que axios.post resuelva con mockResponse
    mockPost.mockResolvedValueOnce(mockResponse);

    const imageId = 1;

    const response = await likeImage(imageId);

    expect(mockPost).toHaveBeenCalledWith(`/images/${imageId}/likes`);

    expect(response).toEqual(mockResponse);
  });

  test('maneja errores correctamente cuando la solicitud falla', async () => {
    const mockError = new Error('Network Error');

    // Configurar el mock para que axios.post rechace con mockError
    mockPost.mockRejectedValueOnce(mockError);

    const imageId = 1;

    // Usar expect con async/await para capturar el error
    await expect(likeImage(imageId)).rejects.toThrow('Network Error');

    expect(mockPost).toHaveBeenCalledWith(`/images/${imageId}/likes`);
  });
});
