import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleGoLogin = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  return (
    <StLoginContainer>
      <StFormContainer>
        <StForm>
          <StP>회원가입</StP>
          <StButtonSet>
            <p>이미 계정이 있으신가요? &nbsp;</p>
            <button onClick={handleGoLogin}>로그인 &gt;</button>
          </StButtonSet>
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
          <StSignupButtonWrapper>
            <StSignupButton onClick={handleEmailSignUp}>회원가입</StSignupButton>
            <StDivider />
            <StSignupButton onClick={handleGoogleLogin}>구글 회원가입</StSignupButton>
          </StSignupButtonWrapper>
        </StForm>
      </StFormContainer>
    </StLoginContainer>
  );
};

const StP = styled.p`
  font-family: 'Dokdo', cursive;
  font-size: 60px;
  margin-bottom: -5px;
  user-select: none;
`;
const StButtonSet = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & p {
    font-size: 14px;
  }

  & button {
    border: none;
    background-color: #b6c4b6;
    transition: color 0.3s;
    font-size: 15px;
    font-weight: 600;
    user-select: none;

    &:hover {
      color: #eef0e5;
    }
  }
`;
const StLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;
const StSignupButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StSignupButton = styled.button`
  width: 350px;
  border-radius: 30px;
  border: none;
  padding: 10px;
  font-size: 15px;
  background-color: #304d30;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
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
  height: 580px;
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
const StDivider = styled.div`
  width: 350px;
  height: 0.2px;
  background-color: rgb(255, 255, 255, 0.6);
  margin: 10px;
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
  height: 600px;
  border: 2px solid rgba(48, 77, 48, 0.3); // 띄어진 선의 스타일을 설정합니다.
`;

export default SignupPage;
