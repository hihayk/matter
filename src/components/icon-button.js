import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.button`
  border: 1px solid var(--border);
  background-color: ${props => props.isChecked ? 'var(--body)' : 'transparent'};
  color: ${props => props.isChecked ? 'var(--background)' : 'var(--body)'};
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const IconButton = ({icon, isChecked, ...props}) => {
  return (
    <Wrapper className="IconButton" isChecked={isChecked} {...props}>{icon}</Wrapper>
  )
}

export default IconButton