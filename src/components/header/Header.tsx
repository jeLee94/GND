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
    if (search === '') {
      alert('내용을 입력해주세요.');
      return;
    } else {
      navigate(`/search?title=${search}`);
      setSearch('');
    }
  };

  // 로그아웃 요청
  const handleAuth = () => {
    if (!!authService.currentUser?.uid) {
      signOut(authService)
        .then(() => {
          navigate('/login');
        })
        .catch((err: any) => alert(err));
    }
  };

  return (
    <NavContainer>
      <Nav>
        <NavBarLink to='/'>
          <NavLogo
            src={process.env.PUBLIC_URL + 'image/GND_logo.png'}
            alt='로고'
          />
        </NavBarLink>

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
          <UserInform>{authService?.currentUser?.email ?? ''}</UserInform>
          {/* 로그아웃 처리 해주기 */}
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

  @media screen and (max-width: 768px) {
    height: 100px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    padding: 0;
  }
`;

const NavBarLink = styled(NavLink)`
  text-decoration: none;
  color: white;
`;

const NavLogo = styled.img`
  width: 140px;
  @media screen and (max-width: 768px) {
    margin-bottom: 0.2rem;
  }
`;

const RightSection = styled.section`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

// 검색창
const SearchForm = styled.form`
  margin-right: 30px;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    margin-right: 0;
  }
`;

const SeachInput = styled.input`
  border: none;
  outline: none;
  width: 200px;
  margin-right: 8px;
  padding: 5px;
  border-radius: 2px;
  background-color: #bfccc7;
  font-size: 0.8rem;
  &:focus {
    background-color: white;
  }
  @media screen and (max-width: 768px) {
    min-width: 350px;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: #ffffff;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const UserInform = styled.div`
  margin-right: 30px;
  font-size: 15px;
  color: #ffffff;
  @media screen and (max-width: 768px) {
    display: none;
  }
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
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
