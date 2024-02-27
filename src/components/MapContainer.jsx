import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function MapContainer() {
  const { kakao } = window;
  const [myLocation, setMyLocation] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setMyLocation({ latitude, longitude });
      updateMap(latitude, longitude);
    }

    function error() {
      const defaultLatitude = 37.44456461009434;
      const defaultLongitude = 126.91216666718286;
      setMyLocation({ latitude: defaultLatitude, longitude: defaultLongitude });
      updateMap(defaultLatitude, defaultLongitude);
      console.log('위치 받기 실패');
    }

    function updateMap(latitude, longitude) {
      const container = document.getElementById('map');
      const location = new kakao.maps.LatLng(latitude, longitude);
      const mapOption = {
        center: location,
        level: 5
      };
      const map = new kakao.maps.Map(container, mapOption);
      const marker = new kakao.maps.Marker({ position: location });
      marker.setMap(map);
    }
  }, []);

  return (
    <StMapContainer>
      <StMap id="map" style={{ width: '100%', height: '100vh' }}></StMap>
    </StMapContainer>
  );
}

export default MapContainer;

const StMapContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const StMap = styled.div``;
