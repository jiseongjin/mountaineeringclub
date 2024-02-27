import styled from "styled-components";
import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignupPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const auth = getAuth();

  const handleEmailSignUp = () => {
    // 이메일을 이용한 회원가입 로직 구현
  };

  const handleGoogleLogin = () => {
    // 구글을 이용한 회원가입 로직 구현
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      // 로그인 성공 후 로직
      console.log("Success", result);
    })
    .catch((error) => {
      // 로그인 실패 후 로직
      console.log("Eorror", error);
    });
  };

  return (
    <StLoginContainer>
      <StP>한사랑 산악회</StP>
      <StForm>
        <StGoogle onClick={handleGoogleLogin}>구글 회원가입</StGoogle>
        <StDivider />
        <StInput
          type='text'
          placeholder='이메일'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StInput
          type='password'
          placeholder='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StInput
          type='text'
          placeholder='비밀번호 재입력'
        />
        <StInput
          type='text'
          placeholder='닉네임'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <StsignupButton>회원가입</StsignupButton>
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
`;
const StsignupButton = styled.button`
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
const StDivider = styled.div`
    width: 350px;
    height: 0.2px;
    background-color: white;
    margin: 20px;
`;

export default SignupPage;