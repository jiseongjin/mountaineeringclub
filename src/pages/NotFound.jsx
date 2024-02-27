import React from 'react'
import mountain from '../assets/mountain.png';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <StContainer>
        <StBox>
            <StImage src={mountain} alt="mountain" />
            <StNotice>404 Not Found</StNotice>
        </StBox>
    </StContainer>
  )
}

const StContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StBox = styled.div`
    width: 100%;
    text-align: center;
`;

const StImage = styled.img`
    width: 200px;
`;

const StNotice = styled.p`
    font-size: 24px;
    font-weight: bold;
    color: #797979;
`;

export default NotFound