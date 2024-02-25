import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom/dist';

const Logout = () => {
  const navigate = useNavigate();

  // 현재 로그인된 사용자 정보 가져오기
  const currentUser = auth.currentUser;

  const handleLogout = async () => {
    if (currentUser) {
      try {
        await signOut(auth);
        alert('로그아웃 되었습니다.');
        navigate('/login');
      } catch (error) {
        console.error('Error with logout: ', error);
      }
    }
  };

  return <div onClick={handleLogout}>로그아웃</div>;
};

export default Logout;
