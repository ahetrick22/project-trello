import React, { Component } from 'react'
import styled from 'styled-components'

const EmptyListStyled = styled.button`
    justify: center;
    color: grey;
    float:right;
    border-radius: 10px solid black;
    width: 440px;
    
    `  
const EmptyListDiv = styled.div`
    padding-top: 50px;
`


export default class emptyList extends Component {
  render() {
    return (
      <EmptyListDiv>
      <EmptyListStyled>
          <h1> + Add a New Card </h1>   
      </EmptyListStyled>
      </EmptyListDiv>
    )
  }
}
