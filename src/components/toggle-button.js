import React, { useState, useRef } from 'react';
import styled from '@emotion/styled'

const ToggleButton = styled.button`
  font: inherit;
  font-weight: 500;
  color: inherit;
  padding: 0.5rem 0.75rem;
  border: none;
  background: none;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px var(--xDimmed);

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 ${props => props.isChecked ? '2px var(--accent)' : '1px var(--accent)'};
  }

  & .ToggleButtonOption + .ToggleButtonOption:before {
    content: '/';
    color: var(--dimmed);
    margin: 0 0.5em;
  }
`

export const ToggleButtonOption = styled.span`
  ${props => props.isActive ? '' : 'color: var(--dimmed)'};
`

export const ToggleButtonGroup = styled.div`
  & .ToggleButton + .ToggleButton {
    margin-left: 0.25rem;
  }

  &.headerButtons {
    margin-right: 1rem;
  }
`

export default ToggleButton