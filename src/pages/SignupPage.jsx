import styled from "styled-components";
import { useState } from "react";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const SignupPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  const auth = getAuth();

  const handleEmailSignUp = async (event) => {
    event.preventDefault();
    // 이메일을 이용한 회원가입 로직 구현
    try {
      // 입력 필드 확인
      if (!email || !password || !passwordConfirm || !nickname) {
        alert("빈 곳을 입력해주세요.")
      }
      // 이메일 확인
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(email)) {
        alert("유효하지 않은 이메일 형식입니다.");
        return;
      }
      // 비밀번호 글자수 확인
      if (password.length < 6) {
        alert("비밀번호는 6자 이상이어야 합니다.");
        return;
      }
      // 비밀번호 재확인
      if (password !== passwordConfirm) {
        alert("비밀번호와 재입력 비밀번호가 일치하지 않습니다.");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // firestore에 닉네임 저장
      await setDoc(doc(db, "users", user.uid), {
        nickname,
      });
      console.log("Success");
    } catch (error) {
      console.log("Eorror", error);
    }
  };

  const handleGoogleLogin = (event) => {
    event.preventDefault();
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
        <StPasswordP>비밀번호를 6자 이상 입력해주세요.</StPasswordP>
        <StInput
          type='password'
          placeholder='비밀번호 재입력'
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <StInput
          type='text'
          placeholder='닉네임'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <StsignupButton onClick={handleEmailSignUp}>회원가입</StsignupButton>
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
const StPasswordP = styled.p`
    font-size: 10px;
    text-align: left;
    width: 75%;
`;

export default SignupPage;