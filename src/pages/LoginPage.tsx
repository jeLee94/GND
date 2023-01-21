import styled from "styled-components";

//로그인 회원가입 화면
const LoginPage = () => {
  return (
    <>
      <header>헤더</header>
      <hr></hr>
      <LoginContainer>
        <Login>로그인</Login>

        <div>
          <p>아이디</p>
          <input />
          <p>비밀번호</p>
          <input />
          <LoginButton>로그인</LoginButton>
          <GoogleLoginButton>구글로 로그인</GoogleLoginButton>
        </div>
      </LoginContainer>
    </>
  );
};

export default LoginPage;

//로그인 전체
const LoginContainer = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  background-color: yellow;
`;

//로그인 타이틀
const Login = styled.h2`
  /* display: flex; */
  align-items: center;
  text-align: center;
`;

//로그인버튼
const LoginButton = styled.button`
  background-color: #3b615b;
`;

//구글로그인버튼
const GoogleLoginButton = styled.button`
  background-color: #3b615b;
`;
