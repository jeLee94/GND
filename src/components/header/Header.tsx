import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <StNavContainer>
      <Nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/lecture'>lectures</NavLink>
        <NavLink to='/dashboard'>dashboard</NavLink>
        <NavLink to='/login'>login</NavLink>
      </Nav>
    </StNavContainer>
  );
};
export default Header;

const StNavContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
