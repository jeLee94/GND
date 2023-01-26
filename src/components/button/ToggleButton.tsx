import styled from 'styled-components';
import React from 'react';

const handleToggle = () => {
  alert('강의 목록 보여주기 버튼');
};
const ToggleButton = () => {
  return (
    <>
      <ToggleBtn onClick={handleToggle}></ToggleBtn>
    </>
  );
};

export default ToggleButton;

const ToggleBtn = styled.button`
  width: 30px;
  height: 30px;
  margin-left: 600px;
  border-radius: 20px;
  background-color: #3b615b;
`;
