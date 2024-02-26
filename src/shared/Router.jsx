import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from 'components/layout/AuthLayout';
import NonAuthLayout from 'components/layout/NonAuthLayout';
import Layout from 'components/layout/Layout';
import MainPage from 'pages/MainPage';
import DetailPage from 'pages/DetailPage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import MyPage from 'pages/MyPage';
import { useSelector } from 'react-redux';

const Router = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 여부 상관없는 라우터 */}
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail" element={<DetailPage />} />
        </Route>

        {/* 로그인 상태가 반드시 아니어야 하는 라우터 */}
        <Route element={<NonAuthLayout />}>
          {!isLogin && (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </>
          )}
        </Route>

        {/* 로그인이 필요한 라우터 */}
        <Route element={<AuthLayout />}>
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
