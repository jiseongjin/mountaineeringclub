import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom/dist';

const Logout = () => {
  // To-Do: 로그인 여부 가져오기
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('로그아웃 되었습니다.');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return <div onClick={handleLogout}>로그아웃</div>;
};

export default Logout;
