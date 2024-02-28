import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import mountain from '../assets/mountain.png';
import axios from 'axios';

const MountainList = ({ InputSearch }) => {
  const mountains = useSelector((state) => state.mountains);
  const [pageAdd, setPageAdd] = useState(9);

  const loadMoreBtn = () => {
    setPageAdd((prev) => prev + 9);
  };
  const [images, setImages] = useState([]);
  const REST_API_KEY = '4b5d15ef584fc69216b3bce213e701d9';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const query = encodeURIComponent('가리산');
        const { data } = await axios.get(`https://dapi.kakao.com/v2/search/image?query=${query}`, {
          headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`
          }
        });
        // console.log(data.documents[0]);
        if (data.documents.length > 0) {
          setImages(data.documents[0].thumbnail_url);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchImages();
  }, [REST_API_KEY]);

  return (
    <>
      <StCardContainer>
        {mountains.length === 0 ? <p>검색 결과가 없습니다 ㅠㅠ</p> : null}
        {mountains.slice(0, pageAdd).map((data) => (
          <StCard>
            <div>{images && <img src={images} />}</div>
            {/* <img src={mountain} alt="이미지" /> */}
            <StCardText>
              <h2>{data.명산_이름}</h2>
              <li>산높이: {data.명산_높이}m</li>
              <li>{data.난이도}</li>
            </StCardText>
            <Link to={'/detail/:postId'}>
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
