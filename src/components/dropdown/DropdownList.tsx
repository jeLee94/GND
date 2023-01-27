import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const DropDownList = (props: any) => {
  const [display, setDisplay] = useState('none');
  const onCheck = () => {
    display == 'none' ? setDisplay('flex') : setDisplay('none');
  };

  const { list, ChooseOne } = props;
  return (
    <Container>
      <DropDownWrap type='checkbox' id='dropdown' onClick={onCheck} />
      <DropDownLabel htmlFor='dropdown' className='label'>
        <Title>정렬</Title>
        <DownIcon icon={faCaretDown} className='icon' />
      </DropDownLabel>
      <Content className='content' onClick={onCheck}>
        <UL>
          {list.map((li: any) => {
            return (
              <LI key={li} onClick={ChooseOne} display={display}>
                {li}
              </LI>
            );
          })}
        </UL>
      </Content>
    </Container>
  );
};

export default DropDownList;

const Container = styled.div`
  width: 150px;
  box-shadow: 0 4px 5px 0 #00000026;
  position: relative;
`;

const DropDownWrap = styled.input`
  visibility: hidden;
  position: absolute;

  :checked + .label + .content {
    display: block;
    border-top: 1px solid #00000026;
  }
  :checked + .label > .icon {
    transform: roatate(-180deg);
  }
`;
const DownIcon = styled(FontAwesomeIcon)`
  transition: transform 250ms ease-out;
`;
const DropDownLabel = styled.label`
  display: flex;
  justify-content: space-between;
  padding: 12px;
`;

const Title = styled.div``;

const Content = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  background: white;
  box-shadow: 0 4px 5px 0 #00000026;
`;

const UL = styled.ul``;
const LI = styled.button<{ display: string }>`
  width: 100%;
  height: 40px;
  display: ${(props) => props.display};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-bottom: 0.1px solid gray;
`;
