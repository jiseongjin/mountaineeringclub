import Logout from 'components/Logout';
import React, { useState } from 'react';
import { Link } from 'react-router-dom/dist';
import styled from 'styled-components';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <StNavContainer>
      <StLogo>
        <Link to="/main">한사랑 산악회</Link>
      </StLogo>
      <StRightNav>
        {isLoggedIn ? (
          <>
            <Link to="/">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        ) : (
          <>
            <Logout />
            <Link to="/mypage">마이페이지</Link>
          </>
        )}
      </StRightNav>
    </StNavContainer>
  );
}

export default Navbar;

const StNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 25px;
`;

const StLogo = styled.span`
  font-family: 'Dokdo', cursive;
  font-size: 36px;
`;

const StRightNav = styled.div`
  display: flex;
  gap: 15px;
`;
