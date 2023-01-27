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
  cursor: pointer;
  color: #222222;
  margin: auto;
  /* margin-bottom: 5px; */
  border: none;
  border-radius: 5px;
  width: 80px;
  height: 22px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: transparent;

  &:hover {
    color: #ffffff;
    background-color: #478a7d;
    background-image: linear-gradient(220deg, #529c8d 0%, #67b5a8 74%);
  }
  &:before,
  :after {
    content: '';
    right: 0;
    top: 0;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.9),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.9),
      inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }
`;
