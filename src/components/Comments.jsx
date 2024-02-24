import { db } from '../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function Comments() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState('');
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);

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

  const handleEditingComment = (event) => {
    setEditingComment(event.target.value);
  };

  // 댓글 등록하기
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    const checkCommentSubmit = window.confirm('댓글을 등록하시겠습니까?');
    if (checkCommentSubmit) {
      try {
        // DB에 데이터 저장하기
        await addDoc(collection(db, 'comments'), {
          comment: newComment
        });
        setComments([{ comment: newComment }, ...comments]);
        setNewComment('');
      } catch (error) {
        console.log('Error adding document: ', error);
      }
    }
  };

  // 댓글 수정하기
  const handleCommentEditButton = (index) => {
    setEditingCommentIndex(index);
  };

  // 댓글 수정 완료하기
  const handleCommentEditCompleteButton = async (index) => {
    if (!editingComment) {
      return alert('수정된 부분이 없습니다.');
    }

    const checkCommentEdit = window.confirm('댓글을 수정하시겠습니까?');
    if (checkCommentEdit) {
      try {
        // DB에 데이터 업데이트하기
        const commentRef = doc(collection(db, 'comments'), comments[index].id);
        await setDoc(commentRef, { comment: editingComment });

        setComments((prevComments) =>
          prevComments.map((comment, i) => (i === index ? { ...comment, comment: editingComment } : comment))
        );
        setEditingCommentIndex(null);
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }
  };

  // 댓글 삭제하기
  const handleCommentDeleteButton = async (index) => {
    const checkCommentDelete = window.confirm('댓글을 삭제하시겠습니까?');
    if (checkCommentDelete) {
      try {
        await deleteDoc(doc(db, 'comments', comments[index].id));
        setComments((prevComments) => prevComments.filter((comment, i) => i !== index));
      } catch (error) {
        console.error('Error deleting document: ', error);
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
            maxLength={150}
          />
          <StCommentButton onClick={handleCommentSubmit}>등록</StCommentButton>
        </StCommentInputContainer>
        <StCommentList>
          {comments.map((comment, index) => (
            <StComment key={index}>
              {editingCommentIndex === index ? (
                <>
                  <textarea defaultValue={comment.comment} onChange={handleEditingComment} autoFocus />
                  {isLoggedIn && (
                    <StCommentButtonWrapper>
                      <button onClick={() => handleCommentEditCompleteButton(index)}>완료</button>
                      <button
                        onClick={() => {
                          setEditingCommentIndex(null);
                        }}
                      >
                        취소
                      </button>
                    </StCommentButtonWrapper>
                  )}
                </>
              ) : (
                <>
                  <p>{comment.comment}</p>
                  {isLoggedIn && (
                    <StCommentButtonWrapper>
                      <button
                        onClick={() => {
                          handleCommentEditButton(index);
                        }}
                      >
                        수정
                      </button>
                      <button onClick={() => handleCommentDeleteButton(index)}>삭제</button>
                    </StCommentButtonWrapper>
                  )}
                </>
              )}
            </StComment>
          ))}
        </StCommentList>
      </StCommentContainer>
    </>
  );
}

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
  height: 90px;
  resize: none;
`;

const StCommentButton = styled.button`
  width: 80px;
`;

const StCommentList = styled.ul`
  margin-top: 20px;
  width: 100%;
`;

const StComment = styled.li`
  background-color: #f0f0f0;
  margin-bottom: 10px;
  padding: 15px;
`;

const StCommentButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
