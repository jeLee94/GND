import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { authService } from '../firebase';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@firebase/auth';

//로그인 화면
const LoginPage = () => {
  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userData, setUserData] = useState(null);

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  // 로그인 요청
  const handleLogin = () => {
    signInWithEmailAndPassword(authService, userEmail, userPassword).then(
      () => {
        setUserEmail('');
        setUserPassword('');
        navigate('/');
      }
    );
    console.log(userEmail, userPassword);
  };

  //구글 로그인
  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authService, provider)
      .then((data) => {
        setUserData(userData);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <LoginContainer>
        <LoginTitle>로그인</LoginTitle>

        <Login onSubmit={onSubmit}>
          <p>아이디</p>
          <EmailInput
            type='text'
            value={userEmail}
            placeholder='이메일을 입력하세요.'
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
          <p>비밀번호</p>
          <PasswordInput
            type='password'
            value={userPassword}
            placeholder='비밀번호를 입력하세요.'
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
          <GoogleLoginButton onClick={handleGoogleLogin}>
            구글로 로그인
          </GoogleLoginButton>
          <RegisterLink>
            <a href='http://localhost:3000/register'>회원가입 하러가기</a>
          </RegisterLink>
        </Login>
      </LoginContainer>
    </>
  );
};

export default LoginPage;

//로그인 전체
const LoginContainer = styled.div`
  width: 500px;
  height: 430px;
  padding: 50px;
  margin-top: 120px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  background-color: #d9d9d9;
  border: 1px double #707070;
`;

//로그인 타이틀
const LoginTitle = styled.h2`
  align-items: center;
  text-align: center;
`;

// 로그인 전체입력부분
const Login = styled.form`
  margin-left: auto;
  margin-right: auto;
`;

//이메일 인풋
const EmailInput = styled.input`
  width: 90%;
  padding: 10px 15px;
`;

//비번 인풋
const PasswordInput = styled.input`
  width: 90%;
  padding: 10px 15px;
`;

//로그인버튼
const LoginButton = styled.button`
  height: 50px;
  width: 360px;
  margin-top: 25px;
  border-radius: 7px;
  border: 1px;
  background-color: #5f9c92;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

//구글로그인버튼
const GoogleLoginButton = styled.button`
  height: 50px;
  width: 360px;
  margin-top: 10px;
  margin-bottom: 12px;
  border-radius: 7px;
  border: 1px;
  background-color: #5f9c92;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

//회원가입 링크
const RegisterLink = styled.div`
  margin-top: 30px;
  text-align: center;
  a {
    text-decoration: none;
  }
`;
