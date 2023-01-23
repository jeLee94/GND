import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <NavContainer>
      <Nav>
        <NavBarLink to='/'>GND</NavBarLink>
        <NavBarLink to='/lecture'>lectures</NavBarLink>
        <NavBarLink to='/dashboard'>dashboard</NavBarLink>
        <RightSection>
          <SearchWrapper>
            <SeachInput type='text' placeholder='강의 검색' />
            <SearchIcon icon={faMagnifyingGlass} />
          </SearchWrapper>
          <NavBarLink to='/login'>
            <LogInButton>Login</LogInButton>
          </NavBarLink>
        </RightSection>
      </Nav>
    </NavContainer>
  );
};
export default Header;

const NavContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  background-color: #5f9c92;
  position: fixed;
  top: 0;
  left: 0;
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const NavBarLink = styled(NavLink)`
  text-decoration: none;
  color: white;
`;

const LogInButton = styled.button`
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 100px;
  background-color: #3b615b;
  color: #ffffff;
  font-size: 0.8rem;
  cursor: pointer;
`;

const RightSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchWrapper = styled.div`
  margin-right: 30px;
`;

const SeachInput = styled.input`
  border: none;
  outline: none;
  width: 200px;
  max-height: 22px;
  margin-right: 8px;
  padding: 5px;
  border-radius: 2px;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: #ffffff;
  cursor: pointer;
`;