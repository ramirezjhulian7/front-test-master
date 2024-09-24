import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import Forma1 from '../../styles/img/Forma1.png';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 20px 40px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 50px;
  padding: 10px 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  font-family: Arial, sans-serif;
  font-size: 16px;
  padding: 10px;
  width: 100%;
  margin-left: 10px;
`;

const Logo = styled.img`
  width: 50px;
`;

const SearchBar = ({ value, onChange }) => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo src={Forma1} alt="logo" />
      </LogoContainer>
      <SearchBarContainer>
        <FaSearch size={20} color="#aaa" />
        <SearchInput
          type="text"
          placeholder="You're looking for something?"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </SearchBarContainer>
    </HeaderContainer>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
