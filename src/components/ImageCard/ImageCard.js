import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { likeImage } from '../../services/api';
import { FaThumbsUp } from 'react-icons/fa';

const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
  max-width: 300px;
  justify-content: center;
  position: relative;
`;

const PriceTag = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 70px solid transparent;
  border-bottom: 80px solid white;
  transform: rotate(180deg);
`;

const PriceText = styled.span`
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 12px;
  font-weight: bold;
  color: black;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  border: 1px solid #f4f4f4;
  overflow: hidden;

  img {
    width: 100%;
    transition: all 0.3s ease;
  }

  @media (min-width: 1450px) {
    &:hover img {
      filter: brightness(50%);
    }

    button {
      display: none;
    }

    &:hover button {
      display: block;
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  }

  @media (max-width: 1449px) {
    button {
      display: none;
    }
  }
`;

const LikeButtonWeb = styled.button`
  background-color: ${(props) => (props.liked ? '#63e3b1' : 'grey')};
  color: white;
  border: none;
  cursor: pointer;
  font-size: 24px;
  transition: all 0.3s ease;
`;

const LikeButton = styled.button`
  background-color: transparent;
  color: ${(props) => (props.liked ? '#63e3b1' : 'grey')};
  border: none;
  cursor: pointer;
  font-size: 24px;
  transition: all 0.3s ease;

  &:hover {
    color: ${(props) => (props.liked ? '#63e3b1' : '#b0b0b0')};
  }

  @media (min-width: 1449px) {
    display: none;
  }
`;

const ImageCard = ({ image, onLikeToggle }) => {
  const [liked, setLiked] = useState(image.liked);
  const [likesCount, setLikesCount] = useState(image.likes_count);

  const handleLike = async () => {
    try {
      await likeImage(image.id);
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
      onLikeToggle(image.id, !liked);
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  };

  return (
    <Card>
      <ImageWrapper>
        <PriceTag />
        <PriceText>{image.price} €</PriceText>
        <img src={image.main_attachment.small} alt={image.title} />
        <LikeButtonWeb aria-label="like" liked={liked} onClick={handleLike}>
          <FaThumbsUp />
          <br />
          <span>{likesCount}</span>
        </LikeButtonWeb>
      </ImageWrapper>
      <h3 style={{ fontFamily: 'Neutraface2Text, Book' }}>{image.title}</h3>
      <p>
        <span style={{ color: 'grey', fontFamily: 'Droid Serif' }}>By</span> <span style={{ fontFamily: 'Droid Serif' }}>{image.author}</span>
      </p>
      <LikeButton aria-label="like" liked={liked} onClick={handleLike}>
        <span>{likesCount}</span>
        <FaThumbsUp />
      </LikeButton>
    </Card>
  );
};

ImageCard.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    liked: PropTypes.bool.isRequired,
    likes_count: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    main_attachment: PropTypes.shape({
      small: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onLikeToggle: PropTypes.func.isRequired,
};

export default ImageCard;
