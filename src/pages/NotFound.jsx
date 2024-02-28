import React from 'react';

import styled from 'styled-components';
import { LiaMountainSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <StContainer>
      <StBox>
        <Link to="/">
          <LiaMountainSolid />
        </Link>
        <StNotice>Not Found</StNotice>
      </StBox>
    </StContainer>
  );
};

const StContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StBox = styled.div`
  width: 100%;
  text-align: center;

  & svg {
    width: 150px;
    height: 150px;
    color: var(--main-color);
  }
`;

const StNotice = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #797979;
`;

export default NotFound;
