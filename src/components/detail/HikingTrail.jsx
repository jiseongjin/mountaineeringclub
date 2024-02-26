import axios from 'axios';
import { useEffect } from 'react';
import styled from 'styled-components';
import KakaoMap from './KakaoMap';

const HikingTrail = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://api.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice',
          {
            params: {
              ServiceKey: '0wHFN3EE7v+jLjujPukh2tGtJj/yCRpvhr5reMlXtjDkWobuC62OIZ+c9fLJ3VbRN3ocF9r3hWOj3r/LaWtf3w==',
              mntnNm: '지리산'
            }
          }
        );
        console.log(response);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);
  //등산로 api
  // cors 에러 있음 chrome 확장프로그램(CORS Unblock) 이용.
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get('https://apis.vworld.kr/2ddata/frstclimb/data', {
  //           params: {
  //             apiKey: 'C52BF50F-4E62-3A15-B415-2D05A786EA03',
  //             domain: 'http://localhost:3000',
  //             emdCd: '41281107',
  //             output: 'json',
  //             srsName: 'EPSG:4326',
  //             id: 'LT_L_FRSTCLIMB.61379'
  //           }
  //         });
  //         // setData(data.featureCollection.features);
  //         console.log(response);
  //       } catch (error) {
  //         console.error('Error:', error);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  return (
    <HikingTrailInformationBox>
      <InformationBox>
        <p>등산 코스</p>
        <KakaoMap />
        <CourseInformationBox>
          <p>난이도 : </p>
          <p>소요시간 : </p>
          <p>코스길이 : </p>
          <p>고도 : </p>
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
    font-size: 25px;
  }
`;

const InformationBox = styled.article`
  display: flex;
  flex-direction: column;
`;

const CourseInformationBox = styled.div`
  width: 1000px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
