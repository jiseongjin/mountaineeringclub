import React from 'react';
import { CourseInformationBox, HikingTrailInformationBox, ImgBox, InformationBox } from 'styles/detailSt/DetailStyied';

function HikingTrail() {
  return (
    <HikingTrailInformationBox>
      <InformationBox>
        <p>등산 코스</p>
        <ImgBox />
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
