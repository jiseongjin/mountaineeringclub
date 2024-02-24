import DetailPage from 'pages/DetailPage';
import MainPage from 'pages/MainPage';
import MyPage from 'pages/MyPage';
import SignupPage from 'pages/SignupPage';

const { default: LoginPage } = require('pages/LoginPage');
const { BrowserRouter, Routes, Route } = require('react-router-dom');

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
