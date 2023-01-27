import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TopButton = () => {
  const [showTopButton, setShowTopButton] = useState(false);
  const location = useLocation();

  // TopButton
  const handleScrollToTop = () => {
    if (location.pathname == '/') {
      window.scrollTo({ top: 200, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const ShowTopButtonClick = () => {
      if (window.scrollY > 200) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };
    window.addEventListener('scroll', ShowTopButtonClick);
    return () => {
      window.removeEventListener('scroll', ShowTopButtonClick);
    };
  }, []);

  return (
    <>
      {showTopButton && (
        <TopScrollButton onClick={handleScrollToTop}>
          <img src={process.env.PUBLIC_URL + '/TopBtn.png'} alt='topScroll' />
        </TopScrollButton>
      )}
    </>
  );
};
export default TopButton;

const TopScrollButton = styled.div`
  cursor: pointer;
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 90px;
  right: 30px;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
  }
  :hover {
    opacity: 0.6;
  }
`;
