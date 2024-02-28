import { auth, db } from '../../../firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CommentItem from './CommentItem';

const Comments = ({ mountainName }) => {
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  // DB에서 데이터 가져오기
  useEffect(() => {
    const loadComments = async () => {
      try {
        const commentsSnapshot = await getDocs(
          query(collection(db, 'comments'), where('mountainName', '==', mountainName))
        );
        const commentsList = commentsSnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        // 댓글 정렬
        const sortedComments =
          sortOrder === 'asc'
            ? commentsList.sort((a, b) => a.timestamp - b.timestamp)
            : commentsList.sort((a, b) => b.timestamp - a.timestamp);

        setComments(sortedComments);
      } catch (error) {
        console.error('Error loading comments: ', error);
      }
    };

    loadComments();
  }, [mountainName, sortOrder]);

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
        const newCommentRef = await addDoc(collection(db, 'comments'), {
          mountainName,
          userId: currentUser.uid,
          comment: newComment,
          timestamp
        });

        // DB에 새로운 댓글 추가 후 새로운 댓글로 로컬 상태 업데이트
        const newCommentData = {
          id: newCommentRef.id,
          mountainName,
          userId: currentUser.uid,
          comment: newComment,
          timestamp
        };

        if (sortOrder === 'asc') {
          setComments([...comments, newCommentData]);
        } else {
          setComments([newCommentData, ...comments]);
        }

        setNewComment('');
      } catch (error) {
        console.log('Error adding document: ', error);
      }
    }
  };

  return (
    <>
      <StCommentContainer>
        <hr />
        <StCommentInputContainer>
          <textarea
            type="text"
            value={newComment}
            onChange={handleNewCommentChange}
            placeholder="댓글을 입력해주세요."
            maxLength={200}
          />
          <StCommentInputButtonWrapper>
            <button onClick={handleCommentSubmit}>등록</button>
          </StCommentInputButtonWrapper>
        </StCommentInputContainer>

        <StCommentListHeader>
          <StCommentCount>
            <p>댓글</p>
            <StCommentCountNumber>{comments.length}</StCommentCountNumber>
          </StCommentCount>

          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value={''}>정렬 기준</option>
            <option value="asc">오래된 순</option>
            <option value="desc">최신 순</option>
          </select>
        </StCommentListHeader>

        <StCommentList>
          {comments.map((comment, index) => (
            <React.Fragment key={comment.id}>
              <hr />
              <CommentItem
                currentUser={currentUser}
                comments={comments}
                setComments={setComments}
                comment={comment}
                index={index}
              />
            </React.Fragment>
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
  margin-bottom: 30px;
  padding: 20px 100px;
  user-select: none;
  background-color: var(--sub-color3);
  border-radius: 10px;

  & hr {
    width: 100%;
    border: none;
    border-top: 1px solid darkgray;
  }
`;

const StCommentInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px auto 20px auto;
  padding: 0px 30px;
  width: 100%;
  background-color: var(--sub-color2);
  padding: 10px;
  border-radius: 10px;

  & textarea {
    padding: 15px;
    width: 100%;
    height: 100px;
    border: 1px solid lightgray;
    border-radius: 5px;
    resize: none;
  }
`;

const StCommentInputButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3px;

  & button {
    padding: 5px 10px;
    border: 1px solid transparent;
    border-radius: 7px;
    background-color: var(--main-color);
    color: white;
    transition: background-color 0.3s ease;

    &:hover {
      border-color: var(--sub-color2);
      background-color: var(--sub-color3);
      color: black;
    }
  }
`;

const StCommentListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 0px 3px 0px;
  padding: 0px 15px;

  & select {
    padding: 4px;
    border: 1px solid gray;
    border-radius: 5px;
    height: 28px;
    font-size: 13px;
  }
`;

const StCommentCount = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & p {
    font-size: 20px;
    font-weight: 600;
  }
`;

const StCommentCountNumber = styled.p`
  color: var(--sub-color2);
`;

const StCommentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 5px;
`;
