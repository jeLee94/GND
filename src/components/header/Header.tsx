import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const Header = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // 검색창 - 검색어 입력시 페이지 이동
  const handleSubmit = (event: any) => {
    event.preventDefault();
    navigate(`/search?title=${search}`);
    setSearch('');
  };

  return (
    <NavContainer>
      <Nav>
        <NavBarLink to='/'>GND</NavBarLink>
        <NavBarLink to='/lecture'>lectures</NavBarLink>
        <NavBarLink to='/dashboard'>dashboard</NavBarLink>
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
`;
