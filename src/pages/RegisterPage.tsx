import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { authService } from '../firebase';
import React from 'react';

//로그인 회원가입 화면
const RegisterPage = () => {
  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const validateInputs = () => {
    if (!userEmail) {
      alert('이메일을 입력해주세요.');
      return true;
    }
    if (!userPassword) {
      alert('비밀번호를 입력해주세요.');
      return true;
    }
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  //회원가입 요청
  const handleRegister = () => {
    createUserWithEmailAndPassword(authService, userEmail, userPassword).then(
      () => {
        setUserEmail('');
        setUserPassword('');
        navigate('/');
      }
    );
    console.log(userEmail, userPassword);
  };

  return (
    <>
      <RegisterContainer>
        <RegisteTitle>회원가입</RegisteTitle>
        <Register onSubmit={onSubmit}>
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
          <p>비밀번호 확인</p>
          <PasswordAgainInput
            type='password'
            value={userPassword}
            placeholder='비밀번호를 한번 더 입력하세요.'
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
          <RegisterButton onClick={handleRegister}>등록</RegisterButton>
          <LoginLink>
            <a href='http://localhost:3000/login'>로그인 하러가기</a>
          </LoginLink>
        </Register>
      </RegisterContainer>
    </>
  );
};

export default RegisterPage;

//회원가입 전체
const RegisterContainer = styled.div`
  width: 500px;
  height: 480px;
  background-color: #d9d9d9;
  padding: 50px;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  border: 1px double #707070;
`;

//회원가입 타이틀
const RegisteTitle = styled.h2`
  /* display: flex; */
  align-items: center;
  text-align: center;
`;

//회원가입 전체입력부분
const Register = styled.form`
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

//비번 확인 인풋
const PasswordAgainInput = styled.input`
  width: 90%;
  padding: 10px 15px;
`;

//등록버튼
const RegisterButton = styled.button`
  height: 50px;
  width: 360px;
  margin-top: 30px;
  border-radius: 7px;
  border: 1px;
  background-color: #5f9c92;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

//로그인 링크
const LoginLink = styled.div`
  margin-top: 30px;
  text-align: center;
  a {
    text-decoration: none;
  }
`;
