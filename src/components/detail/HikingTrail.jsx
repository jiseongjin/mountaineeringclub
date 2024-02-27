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
const CourseInformationBox = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
  background-color: #B6C4B6;
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
`;