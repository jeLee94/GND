import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useState } from 'react';
import styled from 'styled-components';
import { authService } from '../firebase';

//로그인 회원가입 화면
const RegisterPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  //회원가입 요청
  const handleRegister = () => {
    createUserWithEmailAndPassword(authService, userEmail, userPassword).then(
      () => {
        setUserEmail('');
        setUserPassword('');
      }
    );
    console.log(userEmail, userPassword);
  };

  return (
    <>
      <RegisterContainer>
        <Register>회원가입</Register>

        <div>
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
          <RegisterButton onClick={handleRegister}>등록</RegisterButton>
        </div>
      </RegisterContainer>
    </>
  );
};

export default RegisterPage;

//회원가입 전체
const RegisterContainer = styled.div`
  width: 500px;
  height: 430px;
  background-color: white;
  border-radius: 12px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  border: 1px double #707070;
`;

//회원가입 타이틀
const Register = styled.h2`
  /* display: flex; */
  align-items: center;
  text-align: center;
`;

//이메일 인풋
const EmailInput = styled.input`
  width: 70%;
  padding: 10px 15px;
`;

//비번 인풋
const PasswordInput = styled.input`
  width: 70%;
  padding: 10px 15px;
`;

//등록버튼
const RegisterButton = styled.button`
  height: 60px;
  width: 360px;
  margin-top: 25px;
  border-radius: 30px;
  border: 1px double #707070;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
