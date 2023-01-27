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
  background-color: #b9b9b9;
  background-image: linear-gradient(315deg, #d4d4d4 0%, #cfcfcf 74%);
  line-height: 30px;
  margin-left: 10px;
  padding: 0;
  border: none;
  border-radius: 5px;
  width: 70px;

  &:hover {
    background-color: #89d8d3;
    background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
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
