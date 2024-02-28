import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom/dist';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { onAuthStateChanged } from '@firebase/auth';
import styled from 'styled-components';

const Bookmark = ({ postId }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userId, setUserId] = useState(null);

  // 현재 로그인한 사용자의 상태를 실시간으로 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  const handleBookmark = async () => {
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
      const userBookmarkRef = doc(db, 'bookmarks', userId);
      const userBookmarkDoc = await getDoc(userBookmarkRef);
      let bookmarkedPosts;
      if (userBookmarkDoc.exists()) {
        bookmarkedPosts = userBookmarkDoc.data().posts;
        if (bookmarkedPosts.includes(postId)) {
          // 포스트가 이미 북마크에 있으면 제거
          const checkUnbookmark = window.confirm('북마크를 취소하시겠습니까?');
          if (checkUnbookmark) {
            await updateDoc(userBookmarkRef, { posts: arrayRemove(postId) });
            setIsBookmarked(false);
          }
        } else {
          // 포스트가 북마크에 없으면 추가
          const checkBookmark = window.confirm('북마크에 추가하시겠습니까?');
          if (checkBookmark) {
            await updateDoc(userBookmarkRef, { posts: arrayUnion(postId) });
            setIsBookmarked(true);
          }
        }
      } else {
        // 첫 북마크인 경우 새로운 문서 생성
        const checkBookmark = window.confirm('북마크에 추가하시겠습니까?');
        if (checkBookmark) {
          await setDoc(userBookmarkRef, { posts: [postId] });
          setIsBookmarked(true);
        }
      }
    } catch (error) {
      console.error('Error updating bookmark document: ', error);
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

  return <BookmarkContainer onClick={handleBookmark}>
    {isBookmarked ? <FaBookmark /> : <FaRegBookmark />} </BookmarkContainer>;
};

const BookmarkContainer = styled.div`
  display: inline-block;
`;

export default Bookmark;
