import React, { useState } from 'react';
import MountainList from 'components/MountainList';
import styled from 'styled-components';
import Image from 'components/Image';
import MapContainer from 'components/MapContainer';

const MainPage = () => {
  const [optionSelect, setOptionSelect] = useState('전체');
  const [activeTab, setActiveTab] = useState('쉬움');
  const [place, setPlace] = useState();
  const [InputText, setInputText] = useState('');

  const selectChangeHandler = (e) => {
    setOptionSelect(e.target.value);
  };

  const onClickActiveTabHandler = (e) => {
    setActiveTab(e.target.textContent);
  };

  const onChangeTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <StContainer>
      <h1>산림청이 선정한 100대 명산 소개</h1>
      <StList>
        <StsSearchForm onSubmit={onSubmitHandler}>
          <input type="text" placeholder="검색어를 입력해주세요" onChange={onChangeTextHandler} value={InputText} />
          <button>검색</button>
        </StsSearchForm>

        <StOption>
          <select onChange={selectChangeHandler} value={optionSelect}>
            <option>전체</option>
            <option>난이도</option>
            <option>소요시간</option>
          </select>
          <StActiveTab>
            <StActiveTabs onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
              쉬움
            </StActiveTabs>
            <StActiveTabs onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
              보통
            </StActiveTabs>
            <StActiveTabs onClick={onClickActiveTabHandler} $activeMyTab={activeTab}>
              어려움
            </StActiveTabs>
          </StActiveTab>
        </StOption>
        {/* <Image /> */}
        <MountainList />
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
  }
`;

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
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const StOption = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
  & select {
  }
`;

const StActiveTab = styled.ul`
  display: flex;
  gap: 5px;
`;

const StActiveTabs = styled.li`
  padding: 1rem;
  font-size: 14px;
  ${(props) => (props.$activeItem === props.children ? 'color: #929292' : 'color: black')};
  cursor: pointer;
`;
