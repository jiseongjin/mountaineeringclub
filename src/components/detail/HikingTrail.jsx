import styled from 'styled-components';
import KakaoMap from './KakaoMap';
import mountainData from 'mountainData.json';
import { useNavigate } from 'react-router-dom';
const HikingTrail = ({ mountainName }) => {
  const navigate = useNavigate();

  // 산 데이터
  const mountainDb = mountainData;
  const foundMountain = [...mountainDb].find((item) => item.명산_이름 === mountainName);
  if (!foundMountain) {
    alert('정보가 없습니다!');
    navigate('/');
  }
  return (
    <>
      <StMntinName>{mountainName}</StMntinName>
      <StHikingTrailInformationBox>
        <StInformationBox>
          <KakaoMap foundMountain={foundMountain} />
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
  width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: #eef0e5;
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
`;
const StMntinName = styled.h2`
  font-size: 35px;
`;
const StMntiDetail = styled.h5`
  font-size: 18px;
  background-color: #b6c4b6;
  padding: 5px;
  border-radius: 10px;
`;
const StLowBox = styled.div`
  display: flex;
  gap: 10px;
`;
