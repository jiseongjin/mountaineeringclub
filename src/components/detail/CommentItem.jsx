import { db } from '../../firebase';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import styled from 'styled-components';
import { formattedDate } from 'util/Date';

const CommentItem = ({ currentUser, comments, setComments, comment, index }) => {
  const [editingComment, setEditingComment] = useState('');
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);

  const handleEditingComment = (event) => {
    setEditingComment(event.target.value);
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
    <StCommentItem key={index}>
      <StCommentInfo>
        {/* To-Do: 회원가입 시 설정한 닉네임 */}
        <p>@@@님</p>
        <p>{formattedDate(comment.timestamp)}</p>
      </StCommentInfo>
      {editingCommentIndex === index ? (
        <>
          <StCommentContent>
            <textarea defaultValue={comment.comment} onChange={handleEditingComment} autoFocus />
          </StCommentContent>
          {currentUser && (
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
          <StCommentContent>
            <p>{comment.comment}</p>
          </StCommentContent>
          {currentUser && (
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
    </StCommentItem>
  );
};

export default CommentItem;

const StCommentItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  padding: 20px 25px;
  border: 1px solid black;
  border-radius: 10px;

  & textarea {
    width: 100%;
    resize: none;
  }
`;

const StCommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StCommentContent = styled.div`
  padding: 15px;
  border: 1px solid black;
  border-radius: 8px;
`;

const StCommentButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  & button {
    padding: 3px 7px;
  }
`;
