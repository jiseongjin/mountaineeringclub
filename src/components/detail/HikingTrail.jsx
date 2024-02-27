import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import KakaoMap from './KakaoMap';
import { isArray } from 'lodash';

const HikingTrail = () => {
  // useParams 이용하기
  const params = '북한산';
  // 산 데이터
  const [mountainData, setMountainData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          'https://apis.data.go.kr/1400000/service/cultureInfoService2/mntInfoOpenAPI2',
          {
            params: {
              ServiceKey: '0wHFN3EE7v+jLjujPukh2tGtJj/yCRpvhr5reMlXtjDkWobuC62OIZ+c9fLJ3VbRN3ocF9r3hWOj3r/LaWtf3w==',
              searchWrd: params
            }
          }
        );
        const mountainDatas = data.response.body.items.item;
        console.log(mountainDatas);
        isArray(mountainDatas)
          ? setMountainData(...mountainDatas.filter((item) => item.mntihigh > 100))
          : setMountainData(mountainDatas);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <HikingTrailInformationBox>
      <InformationBox>
        <KakaoMap params={params} />
        {/* <ImgBox /> */}
        <MntinName>{params}</MntinName>
        <CourseInformationBox>
          <MntiDetail>{mountainData?.mntidetails}</MntiDetail>
          {/* <p>소요시간 : </p>
          <p>코스길이 : </p> */}
          <p>높이 : {mountainData?.mntihigh}M</p>
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

const ImgBox = styled.img`
  margin-top: 10px;
  height: 400px;
  width: 1000px;
`;

const MntinName = styled.h2`
  font-size: 40px;
`;

const MntiDetail = styled.h5`
  font-size: 18px;
`;
