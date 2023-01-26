import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

const ToggleButton = (props: any) => {
  const { onClick, icon } = props;
  return (
    <>
      <ToggleBtn
        onClick={() => {
          onClick();
        }}
      >
        <ToggleIcon icon={icon == 'minus' ? faSquareMinus : faSquarePlus} />
      </ToggleBtn>
    </>
  );
};

export default ToggleButton;

const ToggleBtn = styled.button`
  background-color: transparent;
  border: 0;
`;

const ToggleIcon = styled(FontAwesomeIcon)`
  color: #3b615b;
  cursor: pointer;
  height: 30px;
`;
