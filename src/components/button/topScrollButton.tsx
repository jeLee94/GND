import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const TopButton = () => {
  const [showTopButton, setShowTopButton] = useState(false);
  // TopButton
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  useEffect(() => {
   const ShowTopButtonClick = () => {
    if (window.scrollY > 200) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  }
  window.addEventListener("scroll", ShowTopButtonClick)
  return () => {
    window.removeEventListener("scroll", ShowTopButtonClick)
  }
}, [])

  return (
    <>
    {showTopButton &&
      <TopScrollButton onClick={handleScrollToTop}>
        <img src='TopBtn.png' alt='topScroll' />
      </TopScrollButton>
    }
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
