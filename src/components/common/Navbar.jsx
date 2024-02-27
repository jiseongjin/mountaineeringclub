import Logout from 'components/Logout';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom/dist';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트 될 때 로그인 상태를 확인하고 업데이트
    const checkLoginStatus = () => {
      // 현재 로그인된 사용자 정보 가져오기
      const currentUser = auth.currentUser;
      setIsLoggedIn(!!currentUser); // 객체의 존재 여부를 부울 값으로 취급하고자 함
    };

    checkLoginStatus();

    // 로그인 상태를 주기적으로 확인하고 업데이트
    // auth.onAuthStateChanged : 사용자의 인증 상태가 변경될 때마다 콜백 함수를 호출
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // isLoggedIn 상태를 업데이트
    });

    return () => unsubscribe(); // cleanup 함수
  }, []); // 의존 배열을 빈 배열로 설정해 마운트 될 때 한 번만 실행되도록

  const handleLogout = () => {
    setIsLoggedOut(true);
  };

  return (
    <>
      <StNavContainer>
        <StLogo>
          <Link to="/">한사랑 산악회</Link>
        </StLogo>
        <StRightNav>
          {isLoggedIn && !isLoggedOut ? (
            <>
              <Logout onLogout={handleLogout} />
              <Link to="/mypage">마이페이지</Link>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </>
          )}
        </StRightNav>
      </StNavContainer>
    </>
  );
};

export default Navbar;

const StNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px auto;
`;

const StLogo = styled.div`
  & a {
    font-family: 'Dokdo', cursive;
    font-size: 48px;
    color: var(--main-color) !important;
  }
`;

const StRightNav = styled.div`
  display: flex;
  gap: 30px;

  & a {
    font-weight: 600;
    font-size: 17px;
    color: gray !important;
    transition: color 0.3s ease;

    &:hover {
      color: black !important;
    }
  }
`;
