import { auth, db } from '../../firebase';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CommentItem from './CommentItem';

const Comments = ({ postId }) => {
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // DB에서 데이터 가져오기
  useEffect(() => {
    const loadComments = async () => {
      const querySnapshot = await getDocs(query(collection(db, 'comments')));
      const commentsList = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setComments(commentsList);
    };
    loadComments();
  }, []);

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  // 댓글 등록하기
  const handleCommentSubmit = async () => {
    // 로그인이 되어 있지 않은 경우
    if (!currentUser) {
      const checkLogin = window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?');
      if (checkLogin) {
        navigate('/login');
        return;
      }
      return;
    }

    if (!newComment.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    const checkCommentSubmit = window.confirm('댓글을 등록하시겠습니까?');
    if (checkCommentSubmit) {
      try {
        const timestamp = new Date();

        // DB에 데이터 저장하기
        await addDoc(collection(db, 'comments'), {
          postId: postId,
          userId: currentUser.uid,
          comment: newComment,
          timestamp
        });
        setComments([{ comment: newComment, timestamp }, ...comments]);
        setNewComment('');
      } catch (error) {
        console.log('Error adding document: ', error);
      }
    }
  };

  return (
    <>
      <StCommentContainer>
        <StCommentInputContainer>
          <StCommentInput
            type="text"
            value={newComment}
            onChange={handleNewCommentChange}
            placeholder="댓글을 입력해주세요."
            maxLength={200}
          />
          <StCommentButton onClick={handleCommentSubmit}>등록</StCommentButton>
        </StCommentInputContainer>
        <StCommentList>
          {comments.map((comment, index) => (
            <CommentItem
              currentUser={currentUser}
              comments={comments}
              setComments={setComments}
              comment={comment}
              index={index}
            />
          ))}
        </StCommentList>
      </StCommentContainer>
    </>
  );
};

export default Comments;

const StCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 100px;
`;

const StCommentInputContainer = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
`;

const StCommentInput = styled.textarea`
  padding: 15px;
  width: 100%;
  height: 100px;
  resize: none;
`;

const StCommentButton = styled.button`
  width: 80px;
`;

const StCommentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
  width: 100%;
`;
