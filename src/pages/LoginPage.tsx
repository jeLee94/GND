import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { authService } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";

//로그인 화면
const LoginPage = () => {
  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userData, setUserData] = useState(null);

  //navigate('/')

  // 로그인 요청
  const handleLogin = () => {
    signInWithEmailAndPassword(authService, userEmail, userPassword).then(
      () => {
        setUserEmail("");
        setUserPassword("");
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

        <Login>
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
          <RegisterButton
            onClick={() => {
              navigate("/register");
            }}
          >
            회원가입
          </RegisterButton>
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
  background-color: white;
  border-radius: 12px;
  padding: 50px;
  margin-top: 120px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  border: 1px double #707070;
`;

//로그인 타이틀
const LoginTitle = styled.h2`
  align-items: center;
  text-align: center;
`;

// 로그인 전체입력부분
const Login = styled.div`
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
  height: 60px;
  width: 360px;
  margin-top: 25px;
  border-radius: 30px;
  border: 1px double #707070;
  background-color: #5f9c92;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

//구글로그인버튼
const GoogleLoginButton = styled.button`
  height: 60px;
  width: 360px;
  margin-top: 10px;
  margin-bottom: 12px;
  border-radius: 30px;
  border: 1px double #707070;
  background-color: #5f9c92;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

//회원가입버튼
const RegisterButton = styled.button`
  margin: auto;
  display: block;
  cursor: pointer;
`;
