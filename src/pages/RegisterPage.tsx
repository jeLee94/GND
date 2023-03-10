import { createUserWithEmailAndPassword } from '@firebase/auth';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { authService } from '../firebase';
import { emailRegex, pwRegex } from '../util/utils';
import { Link } from 'react-router-dom';

//회원가입 화면
const RegisterPage = () => {
  let navigate = useNavigate();
  // const emailRef = useRef(null);
  //const pwRef = useRef(null);

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPwConfirm, setUserPwConfirm] = useState('');

  //유효성 검사 함수
  const validateInputs = () => {
    const matchedEmail = userEmail.match(emailRegex);
    const matchedPw = userPassword.match(pwRegex);

    if (!userEmail) {
      alert('이메일을 입력해주세요.');
      // emailRef.current.focus();
      return true;
    }
    if (matchedEmail === null) {
      alert('이메일 형식에 맞게 입력해 주세요.');
      //emailRef.current;
      return true;
    }
    if (!userPassword) {
      alert('비밀번호를 입력해주세요.');
      //pwRef.current;
      return true;
    }
    if (matchedPw === null) {
      alert('비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.');
      //pwRef.current;
      return true;
    }
    if (!userPwConfirm) {
      alert('비밀번호를 한번 더 입력해주세요.');
      //pwRef.current;
      return true;
    }
    if (userPassword !== userPwConfirm) {
      alert('비밀번호가 일치하지 않아요. 다시 입력해주세요.');
      return true;
    }

    console.log('matchedPw: ', matchedPw);
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleRegister = () => {
    //유효성 검사
    if (validateInputs()) {
      return;
    }
    //회원가입 요청
    createUserWithEmailAndPassword(authService, userEmail, userPassword)
      .then(() => {
        setUserEmail('');
        setUserPassword('');
        navigate('/');
        alert('개나두 회원이 되신걸 환영합니다!');
      })
      .catch((err) => {
        console.log('err.message:', err.message);
        if (err.message.includes('already-in-use')) {
          alert('이미 사용중인 아이디입니다.');
        }
      });
  };
  return (
    <ResisterContainer>
      <RegisterContainer>
        <RegisteTitle>회원가입</RegisteTitle>
        <Register onSubmit={onSubmit}>
          <IdSection>
            <label htmlFor='id-input'>아이디</label>
            <input
              id='id-input'
              type='text'
              value={userEmail}
              placeholder='이메일을 입력하세요.'
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
          </IdSection>
          <IdSection>
            <label htmlFor='password-input'>비밀번호</label>
            <input
              id='password-input'
              type='password'
              value={userPassword}
              placeholder='비밀번호를 입력하세요.'
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
            />
          </IdSection>
          <PwSection>
            <label htmlFor='password-confirm-input'>비밀번호 확인</label>
            <input
              id='password-confirm-input'
              type='password'
              value={userPwConfirm}
              placeholder='비밀번호를 한번 더 입력하세요.'
              onChange={(e) => {
                setUserPwConfirm(e.target.value);
              }}
            />
          </PwSection>
          <ButtonSection>
            <RegisterButton onClick={handleRegister}>등록</RegisterButton>
            <LoginLink to={`/login`}> 로그인 하러가기</LoginLink>
          </ButtonSection>
        </Register>
      </RegisterContainer>
    </ResisterContainer>
  );
};

export default RegisterPage;

const ResisterContainer = styled.div`
  width: 100%;
  height: 100%;
`;

//회원가입 전체
const RegisterContainer = styled.div`
  width: 35%;
  min-width: 350px;
  height: 50%;
  padding: 50px;
  margin: 0 auto;
  margin-top: 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #d9d9d9;
  box-shadow: 15px 15px 45px -5px rgba(0, 0, 0, 0.3);
`;

//회원가입 타이틀
const RegisteTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  color: #222222;
  margin-bottom: 2rem;
`;

//회원가입 전체입력부분
const Register = styled.form`
  width: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  label {
    width: 80%;
    font-size: 1rem;
    font-weight: 600;
    color: #222222;
  }
  input {
    width: 80%;
    height: 36px;
    border: none;
    outline: none;
    border-radius: 5px;
    margin-top: 0.5rem;
    padding: 2px 5px;
  }
`;

const IdSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 300px;
  margin-bottom: 20px;
`;

const PwSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 300px;
  margin-bottom: 20px;
`;

const ButtonSection = styled.div`
  width: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//등록버튼
const RegisterButton = styled.button`
  height: 35px;
  width: 80%;
  margin-top: 2rem;
  border: none;
  border-radius: 7px;
  background-color: #5f9c92;
  color: white;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  &:hover {
    background-color: #478a7d;
  }
`;

//로그인 링크
const LoginLink = styled(Link)`
  height: 35px;
  width: 80%;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  color: #478a7d;
  background-color: transparent;
  border-radius: 7px;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  text-align: center;
  line-height: 2.2rem;
  &:hover {
    background-color: #ffffff;
    color: #f39d2d;
  }
`;
