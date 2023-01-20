import styled from "styled-components";

interface Props {
  children: any;
}
const LogoutBtn = () => {
  alert("로그아웃");
};

const Button = ({ children }: Props) => {
  return (
    <>
      <Btn onClick={LogoutBtn}>{children}</Btn>
    </>
  );
};

export default Button;

const Btn = styled.button`
  width: 70px;
  margin-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
