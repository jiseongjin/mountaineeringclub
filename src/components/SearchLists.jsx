import React from 'react';
import styled from 'styled-components';

const SearchLists = ({ items }) => {
  return (
    <StCardContainer>
      <StCard>
        <img src="" alt="이미지" />
        <StCardText>
          <h2>{items.title}</h2>
          <span>난이도 쉬움</span>
          <p>소요시간 1시간 2분</p>
        </StCardText>
      </StCard>
      <button>자세히 보기</button>
    </StCardContainer>
  );
};

export default SearchLists;

const StCardContainer = styled.div`
  width: 400px;
  border: 2px solid #a3a3a3;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 30px;

  & button {
    margin-left: 17rem;
  }
`;

const StCard = styled.article``;

const StCardText = styled.div``;
