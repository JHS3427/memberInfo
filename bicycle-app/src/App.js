import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginHome } from './pages/LoginHome.jsx';
import { Login } from './pages/Login2.jsx';
import { SignUp } from './pages/SignUp.jsx';
import KakaoLogin from 'react-kakao-login';
import './App.css';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element = {<LoginHome/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/kakaologin" element = {<KakaoLogin/>}/>
        <Route path="/signUp" element = {<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
