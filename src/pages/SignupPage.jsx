import styled from "styled-components";

export default function SignupPage() {
  return (
    <StLoginContainer>
      <StP>한사랑 산악회</StP>
      <StForm>
        <StGoogle>구글 회원가입</StGoogle>
        <StDivider />
        <StInput type='text' placeholder='이메일을 입력하세요'></StInput>
        <StInput type='password' placeholder='비밀번호를 입력하세요'></StInput>
        <StInput type='text' placeholder='닉네임을 입력하세요'></StInput>
        <StLoginButton>회원가입</StLoginButton>
        <StSignupButton>로그인</StSignupButton>
      </StForm>
    </StLoginContainer>

  );
};

const StP = styled.p`
    font-family: 'Dokdo', cursive;
    font-size: 60px;
    margin: 15px;
    user-select: none;
`;
const StLoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color: #EEF0E5;
`;
const StGoogle = styled.button`
    width: 350px;
    border-radius: 30px;
    border: none;
    padding: 10px;
    font-size: 15px;
    background-color: #304D30;
    color: white;
    cursor: pointer;
    transition: backgroud-color 2s;
    user-select: none;
    margin: 10px;

    &:hover {
      background-color: #163020;
    }
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
    user-select: none;
    cursor: pointer;
    margin: 7px;
`;
const StLoginButton = styled.button`
    width: 100px;
    border-radius: 5px;
    border: none;
    font-size: 15px;
    padding: 10px;
    margin: 10px;
    margin-left: 263px;
    background-color: #304D30;
    color: white;
    cursor: pointer;
    transition: backgroud-color 2s;
    user-select: none;

    &:hover {
      background-color: #163020;
    }
`;
const StSignupButton = styled.button`
    border: none;
    background-color: #B6C4B6;
    transition: backgroud-color 2s;
    font-size: 15px;
    user-select: none;

    &:hover {
      color: #EEF0E5;
      
    }
`;
const StDivider = styled.div`
    width: 350px;
    height: 0.2px;
    background-color: white;
    margin: 20px;
`;
