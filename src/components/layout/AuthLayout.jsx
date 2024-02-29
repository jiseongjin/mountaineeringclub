import Navbar from 'components/common/Navbar';
import { auth } from '../../firebase';
import { Navigate, Outlet } from 'react-router-dom/dist';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loading from '../../assets/Loading.gif';
import Footer from 'components/common/Footer';

const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 상태를 주기적으로 확인하고 업데이트
    // auth.onAuthStateChanged : 사용자의 인증 상태가 변경될 때마다 콜백 함수를 호출
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // isLoggedIn 상태를 업데이트
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup 함수
  }, []); // 의존 배열을 빈 배열로 설정해 마운트 될 때 한 번만 실행되도록

  if (loading) {
    return (
      <StLoading>
        <img src={Loading} alt="Loading" />
        잠시만 기다려 주세요.
      </StLoading>
    );
  }

  if (!isLoggedIn) {
    alert('로그인이 필요한 페이지입니다.');
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;

const StLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;

  & img {
    width: 100px;
    height: 100px;
  }
`;
