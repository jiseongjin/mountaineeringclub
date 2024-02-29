import { useState } from 'react';
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
                  <StTextbox>📌 고도</StTextbox>
                  <li>{data.명산_높이}m</li>
                  <StTextbox>⏰ 산행시간</StTextbox>
                  <li>{data.산행시간}</li>
                  <StTextbox>📍 난이도</StTextbox>
                  <li>{data.난이도}</li>
                  <StTextbox>🏞️ 위치</StTextbox>
                  <li>{data.명산_소재지}</li>
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
                  <StTextbox>📌 고도</StTextbox>
                  <li>{data.명산_높이}m</li>
                  <StTextbox>📍 난이도</StTextbox>
                  <li>{data.난이도}</li>
                  <StTextbox>⏰ 산행시간</StTextbox>
                  <li>{data.산행시간}</li>
                  <StTextbox>🏞️ 위치</StTextbox>
                  <StTextboxLocation>{data.명산_소재지}</StTextboxLocation>
                </StCardText>
                <StLink to={`/detail/${data.명산_이름}`}>
                  <button>자세히 보기</button>
                </StLink>
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
              <StCardWrapper>
                <StCard key={data.id}>
                  <Img data={data} />
                  <StCardText>
                    <h2>{data.명산_이름}</h2>
                    <StTextbox>📌 고도</StTextbox>
                    <li>{data.명산_높이}m</li>
                    <StTextbox>📍 난이도</StTextbox>
                    <li>{data.난이도}</li>
                    <StTextbox>⏰ 산행시간</StTextbox>
                    <li>{data.산행시간}</li>
                    <StTextbox>🏞️ 위치</StTextbox>
                    <StTextboxLocation>{data.명산_소재지}</StTextboxLocation>
                  </StCardText>
                  <StLink to={`/detail/${data.명산_이름}`}>
                    <button>자세히 보기</button>
                  </StLink>
                </StCard>
              </StCardWrapper>
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
  margin-top: 40px;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  gap: 40px;
`;

const StCardWrapper = styled.article`
  display: flex;
  gap: 20px;
  user-select: none;
`;

const StCard = styled.div`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  width: 400px;
  background-color: #dce7db;

  & button {
    border-radius: 15px;
    background-color: var(--main-color);
    color: white;
    font-size: 1rem;
    font-weight: bold;
    min-height: 3rem;
    padding: 0.3rem 0.6rem;
    border: none;
    width: 300px;
    transition: all 0.3s ease;

    &:hover {
      border: 1px solid var(--main-color);
      background-color: var(--sub-color3);
      color: var(--main-color);
    }
  }
  & img {
    width: 280px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin: 20px 0 30px 0;
  }
  &:hover {
    box-shadow: 5px 5px 5px lightgray;
    transition: all 0.3s ease;
  }
`;

const StCardText = styled.ul`
  width: 300px;
  gap: 10px;
  border-top: 1px solid var(--main-color);
  padding: 1rem;
  margin-bottom: 10px;

  & li {
    margin-bottom: 10px;
  }

  & h2 {
    font-weight: bold;
    font-size: 25px;
    margin: 20px 0 10px 0;
    color: var(--main-color);
  }
`;

const StLink = styled(Link)`
  transition: all 0.3s ease;
  margin-bottom: 15px;
`;

const StTextbox = styled.p`
  font-weight: bold;
  color: black;
  line-height: 1.6;
  font-size: 17px;
`;

const StTextboxLocation = styled.span`
  line-height: 1.5;
  font-weight: 500;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0 30px 0;
`;

const StAddBtn = styled.button`
  width: 200px;
  border-radius: 15px;
  border: solid 1px var(--main-color);
  background-color: var(--main-color);
  color: white;

  font-size: 16px;
  font-weight: 600;
  padding: 0.7rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--sub-color3);
    color: var(--main-color);
  }
`;
