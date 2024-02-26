import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom/dist';
import styled from 'styled-components';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();

    // 현재 로그인된 사용자 정보 가져오기
    const currentUser = auth.currentUser;

    // 로그인 상태인 경우에만
    if (currentUser) {
      try {
        await signOut(auth);
        alert('로그아웃 되었습니다.');
        onLogout();
        navigate('/');
      } catch (error) {
        console.log('Error with logout', error);
      }
    } else {
      alert('로그인 상태가 아닙니다.');
    }
  };

  return <StLogout onClick={handleLogout}>로그아웃</StLogout>;
};

export default Logout;

const StLogout = styled.span`
  font-weight: 600;
  color: gray;
  cursor: pointer;
`;
