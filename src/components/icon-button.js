import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.button`
  border: 1px solid var(--border);
  background-color: ${props => props.isChecked ? 'var(--body)' : 'transparent'};
  color: ${props => props.isChecked ? 'var(--background)' : 'var(--body)'};
  width: ${props => props.size};
  height: ${props => props.size};
  max-width: 3rem;
  max-height: 3rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }
  
  &:active {
    border-color: transparent;
    background-color: ${props => props.isChecked ? 'transparent' : 'var(--body)'};
    color: ${props => props.isChecked ? 'var(--body)' : 'var(--background)'};
  }
`

const IconButton = ({icon, isChecked, ...props}) => {
  return (
    <Wrapper className="IconButton" isChecked={isChecked} {...props}>{icon}</Wrapper>
  )
}

IconButton.defaultProps = {
  size: '3rem'
}

export default IconButton