import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DetailPage from 'pages/DetailPage';
import MainPage from 'pages/MainPage';
import MyPage from 'pages/MyPage';
import SignupPage from 'pages/SignupPage';
import LoginPage from 'pages/LoginPage';


export default function Router() {


  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />


      </Routes>
    </BrowserRouter>
  );
};