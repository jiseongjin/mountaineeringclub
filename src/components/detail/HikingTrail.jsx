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
      <StMntinName>{params}</StMntinName>
      <StHikingTrailInformationBox>
        <StInformationBox>
          <KakaoMap foundMountain={foundMountain} />
          {/* <ImgBox /> */}
          <p>소재지 : {foundMountain.명산_소재지}</p>
          <StCourseInformationBox>
            <StMntiDetail>개요 : {foundMountain.산_개요}</StMntiDetail>
            <StLowBox>
              <p>{foundMountain.난이도}</p>
              <p>높이 : {foundMountain.명산_높이} M</p>
            </StLowBox>
            <StMntiDetail>산행포인트 : {foundMountain.산행포인트}</StMntiDetail>
          </StCourseInformationBox>
        </StInformationBox>
      </StHikingTrailInformationBox>
    </>
  );
};

export default HikingTrail;

const StHikingTrailInformationBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  p {
    font-size: 25px;
  }
`;
const StInformationBox = styled.article`
  display: flex;
  flex-direction: column;
`;
const StCourseInformationBox = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
  background-color: #b6c4b6;
  padding: 5px;
`;
const StMntinName = styled.h2`
  font-size: 40px;
  margin-left: 100px;
`;
const StMntiDetail = styled.h5`
  font-size: 18px;
`;
const StLowBox = styled.div`
  display: flex;
  gap: 10px;
`;
