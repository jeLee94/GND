import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { authService } from '../firebase';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  getAuth,
  setPersistence,
  browserSessionPersistence
} from '@firebase/auth';
import { emailRegex, pwRegex } from '../util/utils';
import { Link } from 'react-router-dom';

//로그인 화면
const LoginPage = () => {
  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userData, setUserData] = useState(null);

  //유효성 검사 함수
  const validateInputs = () => {
    const matchedEmail = userEmail.match(emailRegex);
    const matchedPw = userPassword.match(pwRegex);

    if (!userEmail) {
      alert('이메일을 입력해주세요.');
      //emailRef.current
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
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleLogin = () => {
    //유효성 검사
    if (validateInputs()) {
      return;
    }
    
      //세션관리
const auth = getAuth();
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    setUserEmail('');
    setUserPassword('');
    return signInWithEmailAndPassword(auth, userEmail, userPassword);
  })
  .catch((error) => {
    if (error.message.includes('user-not-found')) {
      alert('회원이 아닙니다. 회원가입을 먼저 진행해 주세요.');
      navigate('/register')
    }else{
      navigate('/');
    }
    if (error.message.includes('wrong-password')) {
      alert('비밀번호가 틀렸습니다.');
    }
  });
}
  //구글 로그인
  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authService, provider)
      .then((data) => {
        setUserData(userData);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginTitle>로그인</LoginTitle>

        <Login onSubmit={onSubmit}>
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
          <PasswordSection>
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
          </PasswordSection>
          <ButtonSection>
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
            <GoogleLoginButton onClick={handleGoogleLogin}>
              구글로 로그인
            </GoogleLoginButton>
          </ButtonSection>
          <RegisterLink to={`/register`}>회원가입하러가기</RegisterLink>
        </Login>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
`;

//로그인 전체
const LoginWrapper = styled.div`
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

//로그인 타이틀
const LoginTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  color: #222222;
  margin-bottom: 2rem;
`;

// 로그인 전체입력부분
const Login = styled.form`
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

const PasswordSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 300px;
  margin-bottom: 40px;
`;

const ButtonSection = styled.div`
  width: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 로그인버튼
const LoginButton = styled.button`
  height: 35px;
  width: 80%;
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

// 구글로그인버튼
const GoogleLoginButton = styled.button`
  height: 35px;
  width: 80%;
  margin-top: 1rem;
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

//회원가입 링크
const RegisterLink = styled(Link)`
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
