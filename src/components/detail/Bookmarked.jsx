import { useState } from 'react';
import { auth } from '../../firebase';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom/dist';

const Bookmarked = ({ postId }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = async () => {
    const currentUser = auth.currentUser;

    // 로그인이 되어 있지 않은 경우
    if (!currentUser) {
      const checkMovetoLogin = window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?');
      if (checkMovetoLogin) {
        navigate('/login');
        return;
      }
      return;
    }

    // 로그인이 되어 있는 경우
    const userId = auth.currentUser.uid;
    try {
    } catch (error) {
      console.error('Error updating scrap document: ', error);
    }
  };

  return <div onClick={handleBookmark}>{isBookmarked ? <FaBookmark /> : <FaRegBookmark />}</div>;
};

export default Bookmarked;
