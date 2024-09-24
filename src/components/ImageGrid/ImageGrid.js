import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageCard from '../ImageCard/ImageCard';
import { fetchImages } from '../../services/api';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #f4f4f4;
  padding-top: 30px;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  gap: 16px;
  margin: 0 auto;
  max-width: 1200px;
  justify-content: center;

  @media (min-width: 1450px) {
    grid-template-columns: repeat(4, 1fr);
    justify-items: start;
  }

  @media (max-width: 1449px) {
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
  }
`;

const ImageGrid = ({ searchTerm }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [lastSearchTerm, setLastSearchTerm] = useState(null);

  const loadImages = useCallback(async (reset = false) => {
    try {
      const response = await fetchImages('', reset ? 1 : page);
      const fetchedImages = response.data;

      if (fetchedImages.length === 0) {
        setHasMore(false);
        return;
      }

      if (reset) {
        setImages(fetchedImages);
        setPage(2);
      } else {
        setImages((prevImages) => [...prevImages, ...fetchedImages]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error al obtener imágenes:', error);
    }
  }, [page]);

  useEffect(() => {
    if (lastSearchTerm === null || searchTerm !== lastSearchTerm) {
      setLastSearchTerm(searchTerm);
      setImages([]);
      setPage(1);
      setHasMore(true);
      loadImages(true);
    }
  }, [searchTerm, lastSearchTerm, loadImages]);

  const filteredImages = searchTerm
    ? images.filter((image) =>
        image.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : images;

  const handleLikeToggle = (id, liked) => {
    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === id
          ? { ...img, liked, likes_count: liked ? img.likes_count + 1 : img.likes_count - 1 }
          : img
      )
    );
  };

  return (
    <InfiniteScroll
      dataLength={filteredImages.length}
      next={() => loadImages(false)}
      hasMore={hasMore}
      loader={<h4>Cargando...</h4>}
      endMessage={<p>No hay más imágenes.</p>}
    >
      <Wrapper>
        <Grid>
          {filteredImages.map((image) => (
            <ImageCard key={image.id} image={image} onLikeToggle={handleLikeToggle} />
          ))}
        </Grid>
      </Wrapper>
    </InfiniteScroll>
  );
};

ImageGrid.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default ImageGrid;
