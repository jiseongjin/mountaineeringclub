import React from 'react';
import styled from 'styled-components';

function Comments() {
  return (
    <>
      <StCommentContainer>
        <StCommentInputContainer>
          <StCommentInput />
          <StCommentButton>등록</StCommentButton>
        </StCommentInputContainer>
        <StCommentList>
          <StComment>
            <StCommentButtonWrapper>
              <button>수정</button>
              <button>삭제</button>
            </StCommentButtonWrapper>
          </StComment>
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
