import React, { Component } from 'react'
import styled from 'styled-components'
import {COLORS, TYPEFACE} from '../css/StyleGuide'

const EmptyListStyled = styled.button`
    border-radius:15px;
    height:50px;
    font-size:1.3em;
    margin:10px;
    font-family:${TYPEFACE};
    color:${COLORS.tertiary};
    background-color:${COLORS.addButtons};

    `  



export default class EmptyList extends Component {
  render() {
    return (

      <EmptyListStyled>
        + New List 
      </EmptyListStyled>

    )
  }
}
