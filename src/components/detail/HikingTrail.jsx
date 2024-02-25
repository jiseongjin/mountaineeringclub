import axios from 'axios';
import { useEffect, useState } from 'react';
import { CourseInformationBox, HikingTrailInformationBox, ImgBox, InformationBox } from 'styles/detailSt/DetailStyied';

function HikingTrail() {
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
  );
}

export default HikingTrail;