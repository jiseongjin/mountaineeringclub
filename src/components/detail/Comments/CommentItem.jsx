import { db } from '../../../firebase';
import { collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formattedDate } from 'util/Date';

const CommentItem = ({ currentUser, comments, setComments, comment, index }) => {
  const [editingComment, setEditingComment] = useState('');
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [userNickname, setUserNickname] = useState('');

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        if (comment.userId) {
          const userDoc = await getDoc(doc(db, 'users', comment.userId));
          if (userDoc.exists()) {
            setUserNickname(userDoc.data().nickname);
          }
        }
      } catch (error) {
        console.error('Error fetching user nickname: ', error);
      }
    };

    fetchNickname();
  }, [comment.userId]);

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
        await setDoc(commentRef, { ...comment, comment: editingComment });

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
      {/* {editingCommentIndex === index && (
        <Overlay
          onClick={() => {
            alert('댓글 수정을 완료해주세요.');
          }}
        >
          <StOverlayCommentItem onClick={(e) => e.stopPropagation()}>
            <StCommentContent>
              <textarea defaultValue={comment.comment} onChange={handleEditingComment} autoFocus />
            </StCommentContent>
            {currentUser && currentUser.uid === comment.userId && (
              <StCommentButtonWrapper>
                <StCommentEditButton onClick={() => handleCommentEditCompleteButton(index)}>완료</StCommentEditButton>
                <StCommentDeleteButton
                  onClick={() => {
                    setEditingCommentIndex(null);
                  }}
                >
                  취소
                </StCommentDeleteButton>
              </StCommentButtonWrapper>
            )}
          </StOverlayCommentItem>
        </Overlay>
      )} */}
      <StCommentItem>
        <StCommentInfo>
          <div>
            <StCommentInfoNickname>{userNickname}</StCommentInfoNickname>
            <span> 님</span>
          </div>
          <p>{formattedDate(comment.timestamp)}</p>
        </StCommentInfo>
        {editingCommentIndex === index ? (
          <>
            <StCommentContent>
              <textarea defaultValue={comment.comment} onChange={handleEditingComment} autoFocus />
            </StCommentContent>
            {currentUser && currentUser.uid === comment.userId && (
              <StCommentButtonWrapper>
                <StCommentEditButton onClick={() => handleCommentEditCompleteButton(index)}>완료</StCommentEditButton>
                <StCommentDeleteButton
                  onClick={() => {
                    setEditingCommentIndex(null);
                  }}
                >
                  취소
                </StCommentDeleteButton>
              </StCommentButtonWrapper>
            )}
          </>
        ) : (
          <>
            <StCommentContent>
              <p>{comment.comment}</p>
            </StCommentContent>
            {currentUser && currentUser.uid === comment.userId && (
              <StCommentButtonWrapper>
                <StCommentEditButton
                  onClick={() => {
                    handleCommentEditButton(index);
                  }}
                >
                  수정
                </StCommentEditButton>
                <StCommentDeleteButton onClick={() => handleCommentDeleteButton(index)}>삭제</StCommentDeleteButton>
              </StCommentButtonWrapper>
            )}
          </>
        )}
      </StCommentItem>
    </>
  );
};

export default CommentItem;

const StCommentItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  margin-top: 10px;
  padding: 20px 40px;
  background-color: var(--sub-color2);
  border-radius: 10px;

  & textarea {
    width: 100%;
    resize: none;
    outline: none;
    border: 1px solid darkgray;
    font-size: 16px;
    padding: 10px;
  }
`;

const StCommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & p {
    font-size: 14px;
  }
`;

const StCommentInfoNickname = styled.span`
  font-weight: 600;
`;

const StCommentContent = styled.div`
  display: flex;
  padding: 20px 15px;
  border-radius: 8px;
  background-color: white;

  & p {
    padding-left: 5px;
    font-size: 14px;
  }

  & textarea {
    font-size: 14px;
    border-radius: 5px;
  }
`;

const StCommentButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: -5px;
`;

const StCommentEditButton = styled.button`
  border: 1px solid transparent;
  background-color: white;
  border-radius: 5px;
  color: var(--sub-color1);
  transition: background-color 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const StCommentDeleteButton = styled.button`
  border: 1px solid transparent;
  background-color: var(--sub-color3);
  border-radius: 5px;
  color: red;
  transition: background-color 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.541);
`;

const StOverlayCommentItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  margin-top: 10px;
  padding: 20px 40px;

  & textarea {
    width: 600px;
    resize: none;
    outline: none;
    border: 1px solid darkgray;
    font-size: 16px;
    padding: 10px;
  }
`;
