import styled from "styled-components";

export default function LoginPage() {
  return (
    <StLoginContainer>
      <StP>한사랑 산악회</StP>
      <StForm>
        <StInput type='text' placeholder='이메일'></StInput>
        <StInput type='password' placeholder='비밀번호'></StInput>
        <StLoginButton>로그인</StLoginButton>
        <StSignupButton>회원가입</StSignupButton>
      </StForm>
    </StLoginContainer>

  );
};

const StP = styled.p`
    font-family: 'Dokdo', cursive;
    font-size: 60px;
    margin: 15px;
`;
const StLoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color: #EEF0E5;
`;
const StForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 500px;
    padding: 20px;
    border-radius: 5px;
    gap: 1rem;
    background-color: #B6C4B6;
`;
const StInput = styled.input`
    width: 350px;
    border-radius: 3px;
    border: none;
    padding: 10px;
    font-size: 15px;
    cursor: pointer;
`;
const StLoginButton = styled.button`
    width: 200px;
    border-radius: 5px;
    border: none;
    font-size: 15px;
    padding: 10px;
    background-color: #304D30;
    color: white;
    cursor: pointer;
    transition: backgroud-color 2s;

    &:hover {
      background-color: #163020;
    }
`;
const StSignupButton = styled.button`
    border: none;
    background-color: #B6C4B6;
    transition: backgroud-color 2s;
    font-size: 15px;

    &:hover {
      color: #EEF0E5;
      
    }
`;