import React, { useState } from 'react';
import MountainList from 'components/MountainList';
import styled from 'styled-components';
// import MapContainer from 'components/MapContainer';
// import { useDispatch, useSelector } from 'react-redux';
// import { setMountain } from '../redux/modules/mountainsSlice';
import mountainData from 'mountainData.json';

const MainPage = () => {
  const [optionSelect, setOptionSelect] = useState('전체');
  const [activeTab, setActiveTab] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  // const mountains = useSelector((state) => state.mountains);
  const [mountainLists, setMountainLists] = useState(mountainData);

  // const dispatch = useDispatch();

  const selectChangeHandler = (e) => {
    setOptionSelect(e.target.value);
    // setActiveTab('');
  };

  const onClickActiveTabHandler = (e) => {
    setActiveTab(e.target.textContent);
  };

  // const tabsOption = {
  //   전체: [],
  //   지역: [
  //     '서울특별시',
  //     '경기도',
  //     '충청북도',
  //     '충청남도',
  //     '전라북도',
  //     '전라남도',
  //     '경상북도',
  //     '경상남도',
  //     '제주특별시'
  //   ],
  //   난이도: ['초급', '중급', '고급']
  // };

  // const filteredTabs = tabsOption[optionSelect] || [];

  const onChangeSearchHandler = (e) => {
    setInputSearch(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <StContainer>
      <h1>산림청이 선정한 100대 명산 소개</h1>
      <p>🔥열정! 열정! 열정!🔥</p>
      <StList>
        <StsSearchForm onSubmit={onSubmitHandler}>
          <input type="text" placeholder="검색어를 입력해주세요" onChange={onChangeSearchHandler} value={inputSearch} />
          <button type="submit">검색</button>
        </StsSearchForm>
        <StOption>
          <select onChange={selectChangeHandler} value={optionSelect}>
            <option>전체</option>
            <option>지역</option>
            <option>난이도</option>
          </select>
        </StOption>
        <StActiveTab>
          {/* {filteredTabs.map((tabs) => (
            <StActiveTabList key={tabs.id} onClick={() => onClickActiveTabHandler(tabs)} $activeTab={activeTab} />
          ))} */}
          {optionSelect === '전체' && ''}
          {optionSelect === '난이도' && (
            <>
              <StActiveTabList onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
                초급
              </StActiveTabList>
              <StActiveTabList onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
                중급
              </StActiveTabList>
              <StActiveTabList onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
                고급
              </StActiveTabList>
            </>
          )}
          {optionSelect === '지역' && (
            <>
              <StActiveTabList onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
                서울특별시
              </StActiveTabList>
              <StActiveTabList onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
                경기도
              </StActiveTabList>
              <StActiveTabList onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
                충청북도
              </StActiveTabList>
              <StActiveTabList onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
                충청남도
              </StActiveTabList>
              <StActiveTabList onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
                전라북도
              </StActiveTabList>
              <StActiveTabList onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
                전라남도
              </StActiveTabList>
              <StActiveTabList onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
                경상북도
              </StActiveTabList>
              <StActiveTabList onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
                경상남도
              </StActiveTabList>
              <StActiveTabList onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
                제주특별시
              </StActiveTabList>
            </>
          )}
        </StActiveTab>
        <MountainList mountainLists={mountainLists} inputSearch={inputSearch} />
      </StList>
    </StContainer>
  );
};

export default MainPage;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & h1 {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
    margin-top: 50px;
  }
`;

const StsSearchForm = styled.form`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 40px;

  & input {
    padding: 1rem 0.6rem;
    border-radius: 20px;
    outline: none;
    border: 1px solid #cfcfcf;
    width: 500px;
  }

  & button {
    padding: 0.3rem 0.6rem;
    border-radius: 10px;
    border: none;
  }
`;

const StList = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const StOption = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const StActiveTab = styled.ul`
  display: flex;
  justify-content: center;
  gap: 5px;
`;

const StActiveTabList = styled.li`
  margin-top: 10px;
  padding: 1rem;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid red;
  /* ${(props) => (props.$activeTab === props.children ? 'border-bottom: 3px solid blue;' : 'none')}; */
  /* ${(props) => (props.$activeTab === props.children ? 'color:black' : 'none')}; */
  cursor: pointer;
  /* border: 1px solid red; */
  /* ${(props) => (props.$activeItem === props.children ? 'border:1px solid #929292' : 'none')}; */
`;
