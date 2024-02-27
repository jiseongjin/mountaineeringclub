import styled from 'styled-components';
import KakaoMap from './KakaoMap';
import mountainData from '';

const HikingTrail = () => {
  // useParams 이용하기
  const params = '북한산';
  // 산 데이터
  const mountainDb = mountainData;

  console.log(mountainDb);

  return (
    <HikingTrailInformationBox>
      <InformationBox>
        <KakaoMap params={params} />
        {/* <ImgBox /> */}
        <MntinName>산이름</MntinName>
        <CourseInformationBox>
          <MntiDetail>내용</MntiDetail>
          {/* <p>소요시간 : </p>
          <p>코스길이 : </p> */}
          <p>높이 : ?? M</p>
        </CourseInformationBox>
      </InformationBox>
    </HikingTrailInformationBox>
  );
};

export default HikingTrail;

const HikingTrailInformationBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  p {
    font-size: 20px;
  }
`;

const InformationBox = styled.article`
  display: flex;
  flex-direction: column;
`;

const CourseInformationBox = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
`;

const MntinName = styled.h2`
  font-size: 40px;
`;

const MntiDetail = styled.h5`
  font-size: 18px;
`;
