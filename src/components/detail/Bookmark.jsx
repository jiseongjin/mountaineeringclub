import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom/dist';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const Bookmark = ({ postId }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  const handleBookmark = async () => {
    if (!userId) {
      const checkLogin = window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?');
      if (checkLogin) {
        navigate('/login');
        return;
      }
      return;
    }
  
    const checkBookmark = window.confirm('등산 코스 북마크 목록에 추가하시겠습니까?');
    if (checkBookmark) {
      try {
        const userBookmarkRef = doc(db, 'bookmarks', userId);
        const userBookmarkDoc = await getDoc(userBookmarkRef);
        let bookmarkedPosts;
        if (userBookmarkDoc.exists()) {
          bookmarkedPosts = userBookmarkDoc.data().posts;
          if (bookmarkedPosts.includes(postId)) {
            // 포스트가 이미 북마크에 있으면 제거
            await updateDoc(userBookmarkRef, { posts: arrayRemove(postId) });
            setIsBookmarked(false);
          } else {
            // 포스트가 북마크에 없으면 추가
            await updateDoc(userBookmarkRef, { posts: arrayUnion(postId) });
            setIsBookmarked(true);
          }
        } else {
          // 첫 북마크인 경우 새로운 문서 생성
          await setDoc(userBookmarkRef, { posts: [postId] });
          setIsBookmarked(true);
        }
      } catch (error) {
        console.error('Error updating bookmark document: ', error);
      }
    }
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (userId) {
        const userBookmarkRef = doc(db, 'bookmarks', userId);
        const userBookmarkDoc = await getDoc(userBookmarkRef);
        if (userBookmarkDoc.exists()) {
          setIsBookmarked(userBookmarkDoc.data().posts.includes(postId));
        }
      }
    };
    fetchBookmarks();
  }, [postId, userId]);

  return <div onClick={handleBookmark}>
    {isBookmarked ? <FaBookmark /> : <FaRegBookmark />} </div>;
};

export default Bookmark;
