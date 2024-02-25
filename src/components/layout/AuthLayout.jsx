import Navbar from 'components/common/Navbar';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom/dist';

const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);
  if (!isLogin) {
    alert('로그인이 필요한 페이지입니다.');
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AuthLayout;
