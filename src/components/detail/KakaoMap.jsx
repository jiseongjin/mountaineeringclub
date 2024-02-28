import React, { useEffect } from 'react';
import styled from 'styled-components';

const KakaoMap = ({ foundMountain }) => {
  useEffect(() => {
    var mapContainer = document.getElementById('map');
    var mapOption = {
      center: new window.kakao.maps.LatLng(foundMountain.X좌표, foundMountain.Y좌표),
      level: 3
    };
    // 지도 생성
    var map = new window.kakao.maps.Map(mapContainer, mapOption);
    // 지형 정보
    map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TERRAIN);
    //확대 축소 컨트롤
    var zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    // 마커를 표시할 위치
    var markerPosition = new window.kakao.maps.LatLng(foundMountain.X좌표, foundMountain.Y좌표);
    // 마커 생성
    var marker = new window.kakao.maps.Marker({
      position: markerPosition
    });
    // 마커를 지도위에 표시
    marker.setMap(map);
    // 마커 커서오버시 인포 윈도우 생성
    var iwContent = `<div style="padding:5px;">${foundMountain.명산_이름}</div>`;
    // 인포 윈도우 생성
    var infowindow = new window.kakao.maps.InfoWindow({
      content: iwContent
    });
    // 마커에 커서이벤트 등록
    window.kakao.maps.event.addListener(marker, 'mouseover', function () {
      // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시
      infowindow.open(map, marker);
    });
    // 마커에 마우스아웃 이벤트를 등록
    window.kakao.maps.event.addListener(marker, 'mouseout', function () {
      // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거
      infowindow.close();
    });
  }, [foundMountain.X좌표, foundMountain.Y좌표, foundMountain.명산_이름]);

  return <StImgBox id="map"></StImgBox>;
};

export default KakaoMap;

const StImgBox = styled.div`
  height: 400px;
  width: 100%;
  margin-bottom: 10px;
`;
