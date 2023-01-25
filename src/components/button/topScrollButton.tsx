import styled from 'styled-components';
// import topButton from '../../util/img/TopBtn.png'
import React, { useState, useEffect } from 'react';
// import React from 'react';

const topScrollButton = () => {
  // const [topBtn, setTopBtn] = useState(false);
  // TopButton
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // useEffect(() => {
  //   if (window.scrollY > 40) {
  //     setTopbtn(true);
  //   } else {
  //     setTopbtn(false);
  //   }
  // })
  // const ScrolltoTopEffet = ()=>{
  //   if (window.scrollY > 40) {
  //     setTopbtn(true);
  //   } else {
  //     setTopbtn(false);
  //   }
  // }

  return (
    <>
      <TopScrollButton onClick={handleScrollToTop}>
        <img src='TopBtn.png' alt='topScroll' />
      </TopScrollButton>
    </>
  );
};
export default topScrollButton;

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
