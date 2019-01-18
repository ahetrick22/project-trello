// import React, { } from 'react'
import styled from 'styled-components';
import { COLORS, TYPEFACE } from '../css/StyleGuide';

// export const StyledButton = styled.button`
//   border-radius: 5px;
//   height: 35px;
//   //   font-size: 1em;
//   padding: 0 10px;
//   font-family: ${TYPEFACE};
//   color: ${COLORS.tertiary};
//   background-color: ${COLORS.addButtons};
// `;

export const StyledButton = styled.button`
  background-color: ${COLORS.addButtons};
  border-radius: 28px;
  border: 1px solid ${COLORS.addButtons};
  margin: 0 0 0 auto;
  cursor: pointer;
  color: ${COLORS.tertiary};
  font-family: ${TYPEFACE};
  font-size: 14px;
  padding: 5px 20px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
  opacity: 0.8;
  :hover {
    background-color: ${COLORS.primary};
    border: 1px solid ${COLORS.primary};
  }
`;
