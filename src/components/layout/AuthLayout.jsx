import Navbar from 'components/common/Navbar';
import { auth } from '../../firebase';
import { Navigate, Outlet } from 'react-router-dom/dist';

const AuthLayout = () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
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
