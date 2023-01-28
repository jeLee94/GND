import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const MoreButton = (props: any) => {
  const { onClick, icon } = props;
  return (
    <>
      <MoreBtn
        onClick={() => {
          onClick();
        }}
      >
        {/* <ToggleIcon icon={icon == 'minus' ? faEllipsis : ''} /> */}
        <MoreIcon icon={icon === 'more' ? faEllipsis : faEllipsis} />
      </MoreBtn>
    </>
  );
};

export default MoreButton;

const MoreBtn = styled.button`
  background-color: transparent;
  border: 0;
`;

const MoreIcon = styled(FontAwesomeIcon)`
  color: #5f9c92;
  cursor: pointer;
  height: 22px;
  &:hover {
    color: #478a7d;
  }
`;
