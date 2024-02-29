import { useState } from 'react';
import MountainList from 'components/main/MountainList';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { filterMountain, localFilterMountain } from '../redux/modules/mountainsSlice';

const MainPage = () => {
  const [optionSelect, setOptionSelect] = useState('전체');
  const [levelActiveTab, setLevelActiveTab] = useState('초급');
  const [localActiveTab, setLocalActiveTab] = useState('서울특별시');
  const [inputSearch, setInputSearch] = useState('');
  const dispatch = useDispatch();

  const selectChangeHandler = (e) => {
    setOptionSelect(e.target.value);
    dispatch(filterMountain('초급'));
    dispatch(localFilterMountain('서울특별시'));
  };
  const localActiveTabHandler = (e) => {
    setLocalActiveTab(e.target.textContent);
    dispatch(localFilterMountain(e.target.textContent));
  };

  const onClickActiveTabHandler = (e) => {
    setLevelActiveTab(e.target.textContent);
    dispatch(filterMountain(e.target.textContent));
  };

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
          <input
            type="text"
            placeholder="산 이름을 입력해주세요"
            onChange={onChangeSearchHandler}
            value={inputSearch}
          />
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
          {optionSelect === '전체' && ''}
          {optionSelect === '난이도' && (
            <>
              <StActiveTabList onClick={onClickActiveTabHandler} $levelActiveTab={levelActiveTab}>
                초급
              </StActiveTabList>
              <StActiveTabList onClick={onClickActiveTabHandler} $levelActiveTab={levelActiveTab}>
                중급
              </StActiveTabList>
              <StActiveTabList onClick={onClickActiveTabHandler} $levelActiveTab={levelActiveTab}>
                고급
              </StActiveTabList>
            </>
          )}
          {optionSelect === '지역' && (
            <>
              <StActiveTabLists onClick={localActiveTabHandler} $localActiveTab={localActiveTab}>
                서울특별시
              </StActiveTabLists>
              <StActiveTabLists onClick={localActiveTabHandler} $localActiveTab={localActiveTab}>
                경기도
              </StActiveTabLists>
              <StActiveTabLists onClick={localActiveTabHandler} $localActiveTab={localActiveTab}>
                강원도
              </StActiveTabLists>
              <StActiveTabLists onClick={localActiveTabHandler} $localActiveTab={localActiveTab}>
                충청북도
              </StActiveTabLists>
              <StActiveTabLists onClick={localActiveTabHandler} $localActiveTab={localActiveTab}>
                충청남도
              </StActiveTabLists>
              <StActiveTabLists onClick={localActiveTabHandler} $localActiveTab={localActiveTab}>
                전라북도
              </StActiveTabLists>
              <StActiveTabLists onClick={localActiveTabHandler} $localActiveTab={localActiveTab}>
                전라남도
              </StActiveTabLists>
              <StActiveTabLists onClick={localActiveTabHandler} $localActiveTab={localActiveTab}>
                경상북도
              </StActiveTabLists>
              <StActiveTabLists onClick={localActiveTabHandler} $localActiveTab={localActiveTab}>
                경상남도
              </StActiveTabLists>
              <StActiveTabLists onClick={localActiveTabHandler} $localActiveTab={localActiveTab}>
                제주특별자치도
              </StActiveTabLists>
            </>
          )}
        </StActiveTab>
        <MountainList
          inputSearch={inputSearch}
          optionSelect={optionSelect}
          levelActiveTab={levelActiveTab}
          localActiveTab={localActiveTab}
        />
      </StList>
    </StContainer>
  );
};

export default MainPage;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;

  & h1 {
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 30px;
    margin-top: 70px;
    color: var(--main-color);
    font-family: '궁서체';
  }

  & p {
    font-weight: 600;
  }
`;

const StsSearchForm = styled.form`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 30px;

  & input {
    padding: 15px 18px;
    border-radius: 20px;
    outline: none;
    border: 1px solid #cfcfcf;
    width: 500px;
    &:focus {
      border-color: var(--main-color);
    }
  }

  & button {
    border-radius: 15px;
    background-color: var(--main-color);
    color: white;
    font-size: 18px;
    font-weight: 600;
    min-height: 3rem;
    padding: 0.3rem 1rem;
    border: none;
    transition: all 0.3s ease;

    &:hover {
      border: 1px solid var(--sub-color2);
      background-color: var(--sub-color3);
      color: var(--main-color);
    }
  }
`;

const StList = styled.div`
  display: flex;
  flex-direction: column;
`;
const StOption = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;
  align-items: center;
  justify-content: center;

  & select {
    padding: 3px;
    border: 1px solid gray;
    border-radius: 5px;
    cursor: pointer;
  }
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

  cursor: pointer;
  ${(props) => (props.$levelActiveTab === props.children ? 'color: black' : 'color: gray')};
  ${(props) => (props.$levelActiveTab === props.children ? 'border-bottom: 3px solid var(--main-color)' : 'none')};
  ${(props) => (props.$levelActiveTab === props.children ? 'font-weight: bold' : 'none')};
`;

const StActiveTabLists = styled.li`
  margin-top: 10px;
  padding: 1rem;
  font-size: 14px;

  cursor: pointer;
  ${(props) => (props.$localActiveTab === props.children ? 'color: black' : 'color: gray')};
  ${(props) => (props.$localActiveTab === props.children ? 'border-bottom: 3px solid var(--main-color)' : 'none')};
  ${(props) => (props.$localActiveTab === props.children ? 'font-weight: bold' : 'none')};
`;
