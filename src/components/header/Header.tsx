import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { authService } from '../../firebase';
import { signOut } from '@firebase/auth';
// import GNDLogo from '../../util/img/GND_logo.png';

const Header = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // 검색창 - 검색어 입력시 페이지 이동
  const handleSubmit = (event: any) => {
    event.preventDefault();
    navigate(`/search?title=${search}`);
    setSearch('');
  };

  // 로그아웃 요청
  const handleAuth = () => {
    if (!!authService.currentUser?.uid) {
      signOut(authService)
        .then(() => {
          console.log('로그아웃 성공');
          navigate('/login');
        })
        .catch((err: any) => alert(err));
    }
  };

  return (
    <NavContainer>
      <Nav>
        <NavBarLink to='/'>
          {/* <NavLogo src='GND_logo.png' alt='로고' /> */}
          <NavLogo src={'./image/GND_logo.png'} alt='로고' />
        </NavBarLink>
        {/* <NavBarLink to='/lecture'>lectures</NavBarLink>
        <NavBarLink to='/dashboard'>dashboard</NavBarLink> */}
        <RightSection>
          <SearchForm onSubmit={handleSubmit}>
            <SeachInput
              type='text'
              placeholder='강의 검색'
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            />
            <button
              type='submit'
              style={{ border: 'none', backgroundColor: 'transparent' }}
            >
              <SearchIcon icon={faMagnifyingGlass} />
            </button>
          </SearchForm>
          <NavBarLink to='/login'>
            <LogInButton onClick={handleAuth}>
              {authService.currentUser ? '로그아웃' : '로그인'}
            </LogInButton>
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
  z-index: 2;
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

const NavLogo = styled.img`
  width: 140px;
`;

const RightSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 검색창
const SearchForm = styled.form`
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
  background-color: #bfccc7;
  font-size: 0.8rem;
  &:focus {
    background-color: white;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: #ffffff;
  cursor: pointer;
`;

// 로그인 버튼
const LogInButton = styled.button`
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 100px;
  background-color: #3b615b;
  color: #ffffff;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  &:hover {
    background-color: #2b5049;
  }
`;
