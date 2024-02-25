import Navbar from 'components/common/Navbar';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom/dist';

function NonAuthLayout() {
  const [isLogin, setIsLogin] = useState(false);
  if (isLogin) {
    alert('이미 로그인 상태입니다.');
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default NonAuthLayout;
