import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Img from './Img';

const MountainList = ({ inputSearch, LevelActiveTab, localActiveTab, optionSelect }) => {
  const mountains = useSelector((state) => state.mountains.mountainData);
  const filteredMountains = useSelector((state) => state.mountains.filteredLevelData);
  const localFilterMountain = useSelector((state) => state.mountains.filteredLocalData);
  // console.log(localFilterMountain);
  const [pageAdd, setPageAdd] = useState(9);
  const loadMoreBtn = () => {
    setPageAdd((prev) => prev + 9);
  };

  return (
    <>
      {optionSelect === '난이도' ? (
        <StCardContainer>
          {filteredMountains
            .filter((item) => {
              if (!inputSearch) {
                return true;
              }
              return item.명산_이름.includes(inputSearch);
            })
            .slice(0, pageAdd)
            .map((data) => (
              <StCard key={data.id}>
                <Img data={data} />
                <StCardText>
                  <h2>{data.명산_이름}</h2>
                  <li>고도: {data.명산_높이}m</li>
                  <li>산행 시간:{data.산행시간}</li>
                  <li>난이도: {data.난이도}</li>
                  <li>위치: {data.명산_소재지}</li>
                </StCardText>
                <Link to={`/detail/${data.명산_이름}`}>
                  <button>자세히 보기</button>
                </Link>
              </StCard>
            ))}
          {mountains.length === 0 ? <p>검색 결과가 없습니다</p> : null}
        </StCardContainer>
      ) : optionSelect === '지역' ? (
        <StCardContainer>
          {localFilterMountain
            .filter((item) => {
              if (!inputSearch) {
                return true;
              }
              return item.명산_이름.includes(inputSearch);
            })
            .slice(0, pageAdd)
            .map((data) => (
              <StCard key={data.id}>
                <Img data={data} />
                <StCardText>
                  <h2>{data.명산_이름}</h2>
                  <li>고도: {data.명산_높이}m</li>
                  <li>산행 시간:{data.산행시간}</li>
                  <li>난이도: {data.난이도}</li>
                  <li>위치: {data.명산_소재지}</li>
                </StCardText>
                <Link to={`/detail/${data.명산_이름}`}>
                  <button>자세히 보기</button>
                </Link>
              </StCard>
            ))}
          {mountains.length === 0 ? <p>검색 결과가 없습니다</p> : null}
        </StCardContainer>
      ) : (
        <StCardContainer>
          {mountains
            .filter((item) => {
              if (!inputSearch) {
                return true;
              }
              return item.명산_이름.includes(inputSearch);
            })
            .slice(0, pageAdd)
            .map((data) => (
              <StCard key={data.id}>
                <Img data={data} />
                <StCardText>
                  <h2>{data.명산_이름}</h2>
                  <li>고도: {data.명산_높이}m</li>
                  <li>산행 시간:{data.산행시간}</li>
                  <li>난이도: {data.난이도}</li>
                  <li>위치: {data.명산_소재지}</li>
                </StCardText>
                <Link to={`/detail/${data.명산_이름}`}>
                  <button>자세히 보기</button>
                </Link>
              </StCard>
            ))}
          {mountains.length === 0 ? <p>검색 결과가 없습니다</p> : null}
        </StCardContainer>
      )}
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

  & img {
    width: 200px;
    height: 200px;
    object-fit: cover;
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
