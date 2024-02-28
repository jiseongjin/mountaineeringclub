import React, { useState } from 'react';
import styled from 'styled-components';

const MountainSearch = ({ mountainLists, setMountainLists }) => {
  const [InputSearch, setInputSearch] = useState('');
  const onChangeSearchHandler = (e) => {
    setInputSearch(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!InputSearch) {
      alert('검색어를 입력해주세요');
    }
    const filteredData = mountainLists.data.filter((item) =>
      item.name.toLowerCase().includes(InputSearch.toLowerCase())
    );
    setMountainLists(filteredData);
  };
  return (
    <StsSearchForm onSubmit={onSubmitHandler}>
      <input type="text" placeholder="검색어를 입력해주세요" onChange={onChangeSearchHandler} value={InputSearch} />
      <button type="submit">검색</button>
    </StsSearchForm>
  );
};

export default MountainSearch;

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
