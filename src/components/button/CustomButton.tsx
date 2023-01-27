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
  background-color: #3b615b;
  background-image: linear-gradient(315deg, #5f9c92 0%, #76c2b6 74%);
  line-height: 30px;
  margin: 10px;
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
    position: absolute;
    content: '';
    right: 0;
    top: 0;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.9),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.9),
      inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }
  /* margin: auto;
  width: 70px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  font-size: 10px;
  padding: 10px 25px;
  background: transparent;
  cursor: pointer;
  
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  background: #3b615b;
  background: linear-gradient(45deg, #3b615bdf 0%, #5f9c92d8 50%);
  border: none;
  &:hover {
    background: transparent;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
      inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    color: #5f9c92d8;
  }
  &:hover:after {
    -webkit-transform: scale(2) rotate(180deg);
    transform: scale(2) rotate(180deg);
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
      inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
  } */
`;
