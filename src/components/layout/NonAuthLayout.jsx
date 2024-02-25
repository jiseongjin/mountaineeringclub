import Navbar from 'components/common/Navbar';
import { auth } from '../../firebase';
import { Navigate, Outlet } from 'react-router-dom/dist';

const NonAuthLayout = () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
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
