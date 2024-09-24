import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3100',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const fetchImages = (search = '', page = 1) => {
    return api.get('/images', {
      params: {
        search,
        page,
      },
    });
  };
  

  export const likeImage = (id) => {
    return api.post(`/images/${id}/likes`);
  };

export default api;
