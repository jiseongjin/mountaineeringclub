import React, { useEffect } from 'react';
import styled from 'styled-components';

const KakaoMap = () => {
  useEffect(() => {
    var container = document.getElementById('map');
    var options = {
      center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    };
    var map = new window.kakao.maps.Map(container, options);
  }, []);
  return <ImgBox id="map"></ImgBox>;
};

export default KakaoMap;

const ImgBox = styled.div`
  margin-top: 10px;
  height: 400px;
  width: 1000px;
`;
