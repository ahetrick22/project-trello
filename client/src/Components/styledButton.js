import React, { } from 'react'
import styled from 'styled-components'
import {COLORS, TYPEFACE} from '../css/StyleGuide'

export const StyledButton = styled.button`
    border-radius:15px;
    height:50px;
    font-size:1.3em;
    margin:10px;
    font-family:${TYPEFACE};
    color:${COLORS.tertiary};
    background-color:${COLORS.addButtons};
    cursor: pointer;

    `  


