import styled from 'styled-components';
import React from 'react';

const CustomButton = (props: any): any => {
  const { onClick, children, idx } = props;
  return (
    <>
      <Button onClick={(e) => onClick(e, idx)}>{children}</Button>
    </>
  );
};

export default CustomButton;

const Button = styled.button`
  margin: auto;
  width: 70px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  font-size: 10px;
  padding: 10px 25px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  background: #3b615b;
  background: linear-gradient(0deg, #3b615bdf 0%, #5f9c92d8 100%);
  border: none;
`;
