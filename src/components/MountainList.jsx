import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import data from 'mountainData.json';

const MountainList = () => {
  const [mountainLists, setMountainLists] = useState(data);

  return (
    <StCardContainer>
      {mountainLists.length === 0 ? <p>등산코스를 검색 해 보세요!</p> : null}
      {mountainLists.data.map((data) => (
        <StCard key={data.id} data={data}>
          <img src="" alt="이미지" />
          <StCardText>
            <h2>{data.명산_이름}</h2>
            <li>산높이: {data.명산_높이}m</li>
            <li>{data.난이도}</li>
          </StCardText>
          <button>자세히 보기</button>
        </StCard>
      ))}
    </StCardContainer>
  );
};

export default MountainList;

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

const StCardText = styled.ul`
  gap: 10px;

  & h2 {
    font-weight: bold;
    font-size: 20px;
  }
  & span {
    padding: 1rem;
  }
`;
