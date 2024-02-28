import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isLogin = useSelector((state) => state.auth.isLogin);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('로그인이 완료되었습니다. 홈페이지로 이동합니다.');
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('이메일 주소 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleGoogleLogin = (event) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Google login success:', result);
        alert('구글 로그인이 완료되었습니다. 홈페이지로 이동합니다.');
        navigate('/');
      })
      .catch((error) => {
        console.error('Google login failed:', error);
        alert('구글 로그인이 실패하었습니다. 다시 시도해주세요.');
      });
  };

  const handleGoSignup = (event) => {
    event.preventDefault();
    navigate('/signup');
  };

  useEffect(() => {
    if (isLogin) {
      alert('이미 로그인되어 있습니다.');
      navigate('/');
    }
  }, [isLogin, navigate]);

  // 비밀번호 재설정
  const handleForgotPassword = async (event) => {
    event.preventDefault();

    try {
      // 이메일이 비어있는지 확인
      if (!email) {
        alert('이메일 주소를 입력해주세요.');
        return;
      }

      setIsLoading(true);

      await sendPasswordResetEmail(auth, email);
      alert('비밀번호 재설정 이메일이 전송되었습니다. 이메일을 확인해주세요.');
    } catch (error) {
      console.error('Error with password reset', error);

      // 이메일이 올바르지 않는 경우 에러 메시지 표시
      if (error.code === 'auth/invalid-email') {
        alert('이메일 형식이 올바르지 않습니다. 다시 확인해주세요.');
      } else {
        alert('비밀번호 재설정 이메일을 전송하는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StLoginContainer>
      <StFormContainer>
        <StForm>
          <StP>로그인</StP>
          <StButtonWrapper>
            <StButtonSet>
              <p>아직 계정이 없으신가요? &nbsp;</p>
              <button onClick={handleGoSignup}>회원가입 &gt;</button>
            </StButtonSet>
            <StButtonSet>
              <p>혹시 비밀번호를 잊으셨나요? &nbsp;</p>
              <button onClick={handleForgotPassword} disabled={isLoading}>
                비밀번호 재설정 &gt;
              </button>
            </StButtonSet>
          </StButtonWrapper>
          <StInput type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
          <StInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StLoginButtonWrapper>
            <StLoginButton onClick={handleLogin}>로그인</StLoginButton>
            <StDivider />
            <StLoginButton onClick={handleGoogleLogin}>구글 로그인</StLoginButton>
          </StLoginButtonWrapper>
        </StForm>
      </StFormContainer>
    </StLoginContainer>
  );
};

const StP = styled.p`
  font-family: 'Dokdo', cursive;
  font-size: 60px;
  margin-bottom: -15px;
  user-select: none;
`;
const StLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  user-select: none;
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
  margin: 10px;
  box-shadow: 0px 0px 5px #163020;
`;
const StLoginButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StLoginButton = styled.button`
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
  margin: 10px;

  &:hover {
    background-color: #163020;
  }
`;
const StButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 15px;

  & button {
    border: none;
    background-color: #b6c4b6;
    transition: color 0.3s;
    font-size: 15px;
    user-select: none;

    &:hover {
      color: #eef0e5;
    }
  }
`;
const StButtonSet = styled.div`
  display: flex;
  align-items: center;

  & p {
    font-size: 14px;
  }

  & button {
    font-weight: 600;
  }
`;
const StDivider = styled.div`
  width: 350px;
  height: 0.2px;
  background-color: rgb(255, 255, 255, 0.6);
  margin: 10px;
`;
const StFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 520px;
  height: 600px;
  border: 2px solid rgba(48, 77, 48, 0.3); // 띄어진 선의 스타일을 설정합니다.
`;

export default LoginPage;
