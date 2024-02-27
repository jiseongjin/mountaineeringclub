<<<<<<< HEAD
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const HikingTrail = () => {
  const [data, SetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          url: 'https://api.vworld.kr/req/data',
          method: 'GET',
          params: {
            key: 'C52BF50F-4E62-3A15-B415-2D05A786EA03',
            attrFilter: 'mntn_nm:=:삼성산|emdCd:=:41171102',
            data: 'LT_L_FRSTCLIMB',
            request: 'GetFeature',
            size: 1000
          }
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <HikingTrailInformationBox>
      <InformationBox>
        <p>등산 코스</p>
        <ImgBox id="map"></ImgBox>
        <CourseInformationBox>
          <p>난이도 : </p>
          <p>소요시간 : </p>
          <p>코스길이 : </p>
          <p>고도 : </p>
        </CourseInformationBox>
      </InformationBox>
    </HikingTrailInformationBox>
=======
import styled from 'styled-components';
import KakaoMap from './KakaoMap';
import mountainData from 'mountainData.json';
import { useNavigate } from 'react-router-dom';
const HikingTrail = () => {
  const navigate = useNavigate();
  // useParams 이용하기
  const params = '설악산';
  // 산 데이터
  const mountainDb = mountainData.data;
  const foundMountain = [...mountainDb].find((item) => item.명산_이름 === params);
  if (!foundMountain) {
    alert('정보가 없습니다!');
    navigate('/');
  }

  return (
    <>
      <MntinName>{params}</MntinName>
      <HikingTrailInformationBox>
        <InformationBox>
          <KakaoMap foundMountain={foundMountain} />
          {/* <ImgBox /> */}
          <p>소재지 : {foundMountain.명산_소재지}</p>
          <CourseInformationBox>
            <MntiDetail>개요 : {foundMountain.산_개요}</MntiDetail>
            <LowBox>
              <p>{foundMountain.난이도}</p>
              <p>높이 : {foundMountain.명산_높이} M</p>
            </LowBox>
            <MntiDetail>산행포인트 : {foundMountain.산행포인트}</MntiDetail>
          </CourseInformationBox>
        </InformationBox>
      </HikingTrailInformationBox>
    </>
>>>>>>> dev
  );
};

export default HikingTrail;

const HikingTrailInformationBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  p {
    font-size: 25px;
  }
`;

const InformationBox = styled.article`
  display: flex;
  flex-direction: column;
`;

<<<<<<< HEAD
const ImgBox = styled.div`
  margin-top: 10px;
  background-color: green;
  /* background-image: url(''); */
  height: 400px;
  width: 500px;
`;

const CourseInformationBox = styled.div`
  width: 1000px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
=======
const CourseInformationBox = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
  background-color: #b6c4b6;
  padding: 5px;
`;

const MntinName = styled.h2`
  font-size: 40px;
  margin-left: 100px;
`;

const MntiDetail = styled.h5`
  font-size: 18px;
`;

const LowBox = styled.div`
  display: flex;
  gap: 10px;
>>>>>>> dev
`;
