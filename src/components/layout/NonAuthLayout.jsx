import Navbar from 'components/common/Navbar';
import useAuth from 'hook/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const NonAuthLayout = () => {
  const { isLogin, checked } = useAuth();

  if (checked && isLogin) {
    alert('이미 로그인 상태입니다.');
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default NonAuthLayout;
