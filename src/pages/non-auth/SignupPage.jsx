import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  const auth = getAuth();

  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.auth.isLogin);

  const handleEmailSignUp = async (event) => {
    event.preventDefault();
    // 이메일을 이용한 회원가입 로직 구현
    try {
      // 입력 필드 확인
      if (!email || !password || !passwordConfirm || !nickname) {
        alert('빈 곳을 입력해주세요.');
        return;
      }
      // 이메일 확인
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(email)) {
        alert('유효하지 않은 이메일 형식입니다.');
        return;
      }
      // 비밀번호 글자수 확인
      if (password.length < 6) {
        alert('비밀번호는 6자 이상이어야 합니다.');
        return;
      }
      // 비밀번호 재확인
      if (password !== passwordConfirm) {
        alert('비밀번호와 재입력 비밀번호가 일치하지 않습니다.');
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // firestore에 닉네임 저장
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        nickname
      });
      console.log('Success');
      // 회원가입 성공 후 로그인 페이지 이동
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (error) {
      console.log('Eorror', error);
    }
  };

  const handleGoogleLogin = (event) => {
    event.preventDefault();
    // 구글을 이용한 회원가입 로직 구현
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const userRef = doc(db, 'users', result.user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          // 이미 구글로 회원이 있는 경우
          alert('이미 가입된 구글 이메일입니다. 로그인 페이지로 넘어갑니다.');
          navigate('/');
          return;
        } else {
          // 회원가입 성공 후
          await setDoc(userRef, {
            uid: result.user.uid,
            email: result.user.email,
            nickname: result.user.displayName
          });
        }
        console.log('Success', result);
        alert('구글 회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login');
        return;
      })
      .catch((error) => {
        // 로그인 실패 후 로직
        console.log('Eorror', error);
      });
  };

  useEffect(() => {
    if (isLogin) {
      alert('이미 로그인되어 있습니다.');
      navigate('/');
    }
  }, [isLogin, navigate]);

  return (
    <StLoginContainer>
      <StP>한사랑 산악회</StP>
      <StFormContainer>
        <StForm>
          <StInput type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
          <StInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StPasswordP>비밀번호를 6자 이상 입력해주세요.</StPasswordP>
          <StInput
            type="password"
            placeholder="비밀번호 재입력"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <StInput type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          <StsignupButton onClick={handleEmailSignUp}>회원가입</StsignupButton>
          <StDivider />
          <StGoogle onClick={handleGoogleLogin}>구글 회원가입</StGoogle>
        </StForm>
      </StFormContainer>
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
  background-color: #eef0e5;
`;
const StGoogle = styled.button`
  width: 350px;
  border-radius: 30px;
  border: none;
  padding: 10px;
  font-size: 15px;
  background-color: #304d30;
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
  background-color: #b6c4b6;
`;
const StInput = styled.input`
  width: 350px;
  border-radius: 3px;
  border: none;
  padding: 10px;
  font-size: 15px;
  user-select: none;
  cursor: pointer;
  box-shadow: 0px 0px 5px #163020;
`;
const StsignupButton = styled.button`
  width: 100px;
  border-radius: 5px;
  border: none;
  font-size: 15px;
  padding: 10px;
  margin: 10px;
  margin-left: 263px;
  background-color: #304d30;
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
  background-color: rgb(255, 255, 255, 0.6);
  margin: 20px;
`;
const StPasswordP = styled.p`
  font-size: 10px;
  text-align: left;
  width: 75%;
`;
const StFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 520px;
  height: 520px;
  border: 2px solid rgba(48, 77, 48, 0.3); // 띄어진 선의 스타일을 설정합니다.
`;

export default SignupPage;