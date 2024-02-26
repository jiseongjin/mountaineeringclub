import React, { useEffect } from 'react';
import styled from 'styled-components';

const KakaoMap = () => {
  useEffect(() => {
    var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    var container = document.getElementById('map');
    var options = {
      center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    };
    var map = new window.kakao.maps.Map(container, options);
    var ps = new window.kakao.maps.services.Places();
    ps.keywordSearch('북한산 등산코스', placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === window.kakao.maps.services.Status.OK) {
        var bounds = new window.kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }
    function displayMarker(place) {
      var marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x)
      });
      window.kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
      });
    }
  }, []);

  return <ImgBox id="map"></ImgBox>;
};

export default KakaoMap;

const ImgBox = styled.div`
  margin-top: 10px;
  height: 400px;
  width: 1000px;
`;
