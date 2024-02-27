import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MountainList = ({ mountainLists }) => {
  const [pageAdd, setPageAdd] = useState(9);

  const loadMoreBtn = () => {
    setPageAdd((prev) => prev + 9);
  };

  return (
    <>
      <StCardContainer>
        {/* {mountainLists.data.length === 0 ? <p>검색 결과가 없습니다 ㅠㅠ</p> : null} */}
        {mountainLists.data.slice(0, pageAdd).map((data) => (
          <StCard key={data.id} data={data}>
            <img src="" alt="이미지" />
            <StCardText>
              <h2>{data.명산_이름}</h2>
              <li>산높이: {data.명산_높이}m</li>
              <li>{data.난이도}</li>
            </StCardText>
            <Link to={`/detail/${data.명산_이름}`}>
              <button>자세히 보기</button>
            </Link>
          </StCard>
        ))}
      </StCardContainer>
      <BtnWrapper>
        <StAddBtn onClick={loadMoreBtn}>더보기</StAddBtn>
      </BtnWrapper>
    </>
  );
};

export default MountainList;

const StCardContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  gap: 20px;
`;

const StCard = styled.article`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 2px solid #a3a3a3;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 10px;
  & button {
    margin-left: 17rem;
  }
`;

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

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0 30px 0;
`;

const StAddBtn = styled.button`
  width: 500px;
  border-radius: 6px;
  border: solid 2px #a3a3a3;
  background-color: white;
  font-size: 15px;
  font-weight: bold;
  padding: 0.5rem;

  & :hover {
    background-color: #a3a3a3;
  }
`;
