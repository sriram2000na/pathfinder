import React, { useState } from 'react';
import styled from 'styled-components';
const StyledSquareIcon = styled.div`
  display: inline-block;
  margin: 0;
  height: 1.3rem;
  width: 1.3rem;
  border: 1px solid black;
  background: ${(props) =>
    props.type === 0 ? 'white' : props.type === 1 ? 'green' : 'brown'};
  &:hover {
    background: red;
  }
`;
export const Square = (props) => {
  const [State, setState] = useState({
    isActive: false,
    visited: false,
    neighbours: [],
  });

  return (
    <>
      <StyledSquareIcon
        onClick={props.handleClick}
        type={props.type}
      ></StyledSquareIcon>
    </>
  );
};
