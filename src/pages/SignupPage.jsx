import React, { useState } from 'react';
import styled from "styled-components";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const auth = getAuth();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();

    try {
      // Check if the email already exists
      const userDoc = doc(db, 'users', email);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        setErrorMessage('이미 존재하는 이메일입니다.');
        return;
      }

      // If email doesn't exist, create new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = {
        email: userCredential.user.email,
        nickname: nickname,
      };

      // Save user data to Firestore
      await setDoc(userDoc, newUser);

      // Navigate to MyPage after successful signup
      navigate('/mypage');
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error signing up: ', error);
    }
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
      <StyledForm onSubmit={handleEmailSignUp}>
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
        <StsignupButton type="submit">회원가입</StsignupButton>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </StyledForm>
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
const StyledForm = styled.form`
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