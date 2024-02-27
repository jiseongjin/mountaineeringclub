import { useState } from 'react';
import { auth } from '../../firebase';
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import { useNavigate } from 'react-router-dom/dist';

const CheckCompletion = ({ postId }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckCompletion = async () => {
    const currentUser = auth.currentUser;

    // 로그인이 되어 있지 않은 경우
    if (!currentUser) {
      const checkLogin = window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?');
      if (checkLogin) {
        navigate('/login');
        return;
      }
      return;
    }

    // 로그인이 되어 있는 경우
    const checkCompletion = window.confirm('완주한 등산 코스 목록에 추가하시겠습니까?');
    if (checkCompletion) {
      const userId = auth.currentUser.uid;
      try {
        // 완주한 코스 체크 기능 (지은)
      } catch (error) {
        console.error('Error updating scrap document: ', error);
      }
    }
  };

  return (
    <div onClick={handleCheckCompletion}>{isChecked ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}</div>
  );
};

export default CheckCompletion;
