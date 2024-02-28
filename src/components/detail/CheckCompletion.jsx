import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import { useNavigate } from 'react-router-dom/dist';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { onAuthStateChanged } from '@firebase/auth';

const CheckCompletion = ({ postId }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [userId, setUserId] = useState(null);

  // 현재 로그인한 사용자의 상태를 실시간으로 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  const handleCheckCompletion = async () => {
    // 로그인이 되어 있지 않은 경우
    if (!userId) {
      const checkLogin = window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?');
      if (checkLogin) {
        navigate('/login');
        return;
      }
      return;
    }

    // 로그인이 되어 있는 경우
    try {
      const userCompletionRef = doc(db, 'completed', userId);
      const userCompletionDoc = await getDoc(userCompletionRef);
      let completedPosts;
      if (userCompletionDoc.exists()) {
        completedPosts = userCompletionDoc.data().posts;
        if (completedPosts.includes(postId)) {
          // 체크박스 해제
          const checkUnCompletions = window.confirm('가보았던 산 목록에 해제하시겠습니까?');
          if (checkUnCompletions) {
            await updateDoc(userCompletionRef, { posts: arrayRemove(postId) });
            setIsChecked(false);
          }
        } else {
          // 체크박스 표시
          const checkCompletions = window.confirm('가보았던 산 목록에 추가하시겠습니까?');
          if (checkCompletions) {
            await updateDoc(userCompletionRef, { posts: arrayUnion(postId) });
            setIsChecked(true);
          }
        }
      } else {
        // 처음 체크할 때 문서생성
        const checkCompletions = window.confirm('가보았던 산 목록에 추가하시겠습니까?');
        if (checkCompletions) {
          await setDoc(userCompletionRef, { posts: [postId] });
          setIsChecked(true);
        }
      }
    } catch (error) {
      console.error('Error updating scrap document: ', error);
    }
  };

  useEffect(() => {
    const fetchCompletions = async () => {
      if (userId) {
        const userCompletionRef = doc(db, 'completed', userId);
        const userCompletionDoc = await getDoc(userCompletionRef);
        if (userCompletionDoc.exists()) {
          setIsChecked(userCompletionDoc.data().posts.includes(postId));
        }
      }
    };
    fetchCompletions();
  }, [postId, userId]);

  return <div onClick={handleCheckCompletion}>
    {isChecked ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />} </div>;

};

export default CheckCompletion;
