import styled from 'styled-components';
import KakaoMap from './KakaoMap';
import mountainData from 'mountainData.json';
import { useNavigate } from 'react-router-dom';
import Bookmark from './Bookmark';
import CheckCompletion from './CheckCompletion';

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
    <StMountainContainer>
      <article>
        <KakaoMap foundMountain={foundMountain} />
        <StMountainInfoBox>
          <StMountainIntro>
            <h1>{mountainName}</h1>
            <Bookmark mountainName={mountainName} />
          </StMountainIntro>
          <StMountainContent>
            <StMountaunLocation>{foundMountain.명산_소재지}</StMountaunLocation>
            <StMountainDetail>
              <StMountainInfo>
                <StBold>📌 고도</StBold>
                <p>{foundMountain.명산_높이} M</p>
              </StMountainInfo>
              <StMountainInfo>
                <StBold>📍 난이도</StBold>
                <p>{foundMountain.난이도}</p>
              </StMountainInfo>
              <StMountainInfo>
                <StBold>⏰ 산행 시간</StBold>
                <p>{foundMountain.산행시간}</p>
              </StMountainInfo>
            </StMountainDetail>
            <StMountainOutline>&nbsp;&nbsp;{foundMountain.산_개요}</StMountainOutline>
          </StMountainContent>
        </StMountainInfoBox>
      </article>
      <StMountainPoint>
        <p>🔍 산행 POINT !</p>
        &nbsp;
        {foundMountain.산행포인트}
      </StMountainPoint>
      <StCompleted>
        <p>혹시 가보셨다면? &nbsp;</p>
        <CheckCompletion mountainName={mountainName} />
      </StCompleted>
    </StMountainContainer>
  );
};
export default HikingTrail;

const StMountainContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;
  width: 1280px;
  user-select: none;

  & article {
    display: flex;
    gap: 40px;
    margin: 50px auto 20px auto;
  }
`;

const StMountainInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const StMountainIntro = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 25px;

  & h1 {
    font-size: 36px;
    font-weight: 600;
  }
`;

const StMountainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 10px;
`;

const StMountaunLocation = styled.p`
  color: gray;
  font-size: 18px;
  margin-bottom: 5px;
`;

const StMountainDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StMountainInfo = styled.div`
  display: flex;
  gap: 15px;
`;

const StBold = styled.p`
  font-weight: 600;
`;

const StMountainOutline = styled.p`
  line-height: 1.6;
`;

const StMountainPoint = styled.div`
  line-height: 1.6;
  margin-bottom: 30px;

  & p {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

const StCompleted = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  & p {
    font-size: 20px;
    font-weight: 600;
  }
`;
