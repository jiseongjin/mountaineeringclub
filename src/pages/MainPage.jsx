import React, { useEffect, useRef, useState } from 'react';
import SearchLists from 'components/SearchLists';
import styled from 'styled-components';
import axios from 'axios';

const MainPage = () => {
  const { kakao } = window;
  const [optionSelect, setOptionSelect] = useState('전체');
  const [activeTab, setActiveTab] = useState('쉬움');
  const [myLocation, setMyLocation] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // const [error, setError] = useState(null);

  const selectChangeHandler = (e) => {
    setOptionSelect(e.target.value);
  };

  const onClickActiveTabHandler = (e) => {
    setActiveTab(e.target.textContent);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
      setMyLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }

    function error() {
      setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
      console.log('위치 받기 실패');
    }

    const container = document.getElementById('map');
    const location = new kakao.maps.LatLng(myLocation.latitude, myLocation.longitude);
    const mapOption = {
      center: location,
      level: 5
    };
    const map = new kakao.maps.Map(container, mapOption);
    const marker = new kakao.maps.Marker({ position: location });
    marker.setMap(map);
    console.log(location.toString());
  }, []);

  // // 장소 검색 객체를 생성합니다
  // var ps = new kakao.maps.services.Places();

  // // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
  // var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  // // 키워드로 장소를 검색합니다
  // searchPlaces();

  // // 키워드 검색을 요청하는 함수입니다
  // function searchPlaces() {
  //   var keyword = document.getElementById('keyword').value;

  //   if (!keyword.replace(/^\s+|\s+$/g, '')) {
  //     alert('키워드를 입력해주세요!');
  //     return false;
  //   }

  //   // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  //   ps.keywordSearch(keyword, placesSearchCB);
  // }

  // const handleSearch = async () => {
  //   //   const geocoder = new kakao.maps.services.Geocoder();
  //   //   let callback = function (result, status) {
  //   //     if (status === kakao.maps.services.Status.OK) {
  //   //       const newSearch = result[0];
  //   //       setState((prevState) => ({
  //   //         ...prevState,
  //   //         center: { lat: newSearch.y, lng: newSearch.x }
  //   //       }));
  //   //     }
  //   //   };
  //   //   geocoder.addressSearch(searchAddress, callback);
  //   // };
  //   const response = await axios.get('https://openapi.naver.com/v1/search/local.json', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-Naver-Client-Id': process.env.REACT_APP_NAVER_CLIENT_ID,
  //       'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_CLIENT_SECRET
  //     }
  //   });

  //   setSearchResults(response.items);
  //   console.log('response', response.items);
  // };

  return (
    <StMapContainer>
      <StMap id="map" style={{ width: '100%', height: '100vh' }}></StMap>

      <StList>
        <StsSearchForm>
          <input type="text" placeholder="지역 검색" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button>검색</button>
        </StsSearchForm>

        <StOption>
          <select onChange={selectChangeHandler} value={optionSelect}>
            <option>전체</option>
            <option>난이도</option>
            <option>소요시간</option>
          </select>
          <StActiveTab>
            <StPotionTep onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
              쉬움
            </StPotionTep>
            <StPotionTep onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
              보통
            </StPotionTep>
            <StPotionTep onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
              어려움
            </StPotionTep>
          </StActiveTab>
        </StOption>
        {/* {searchResults.length === 0 ? <p>등산코스를 검색 해 보세요!</p> : null} */}
        {/* {searchResults.map((item, index) => (
          <SearchLists key={index} item={item} />
        ))} */}
        <SearchLists />
      </StList>
    </StMapContainer>
  );
};

export default MainPage;

const StMapContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const StMap = styled.div``;

const StsSearchForm = styled.form`
  display: flex;
  gap: 20px;

  & input {
    padding: 0.7rem 1rem;
    border-radius: 20px;
    outline: none;
    border: 1px solid #cfcfcf;
  }

  & button {
    padding: 0.3rem 0.6rem;
    border-radius: 10px;
    border: none;
  }
`;

const StList = styled.div`
  background-color: white;
  width: 600px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  flex-wrap: wrap;
  box-shadow: 8px 5px 5px gray;
`;
const StOption = styled.div`
  display: flex;
  margin-top: 20px;
`;

const StActiveTab = styled.ul`
  display: flex;
`;

const StPotionTep = styled.li`
  padding: 1rem;
  ${(props) => (props.$activeTab === props.children ? 'border: 1px solid #929292;' : 'black')};

  cursor: pointer;
`;

// const St
