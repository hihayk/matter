import React from 'react'
import styled from "@emotion/styled"

const PriorityDotWrapper = styled.button`
  width: var(--maxDotSize);
  height: var(--maxDotSize);
  border-radius: 100%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }
`

const Dot = styled.div`
  width: var(--dotSize);
  height: var(--dotSize);
  border-radius: 100%;
  background-color: var(--accent);
  cursor: pointer;
`

const PriorityDot = ({ prority, onClick }) => {
  return (
    <PriorityDotWrapper onClick={onClick}>
      <Dot prority={prority} style={{ '--dotSize' : `calc(${prority}rem / var(--dotRatio))` }}/>
    </PriorityDotWrapper>
  )
}

export default PriorityDot
