import React from 'react'
import styled from "@emotion/styled"
import { keyframes } from "@emotion/core"
import SvgArrowDown from '../icons/arrow-down';

const arrowBounce = keyframes`
  50% {
    transform: translate(0, 0.3rem);
  }
`

const tooltipIntro = keyframes`
  0%, 70% {
    opacity: 0;
    transform: translate(0, 1rem);
  }
`

const TooltipWrapper = styled.div`
  background-color: var(--background);
  position: absolute;
  bottom: calc(100% + 0.5rem);
  padding: 1rem;
  display: flex;
  align-items: center;
  
  --negativeDotSize: calc(var(--maxDotSize) * -1);
  --padding: 1rem;
  --tooltipEdgeToArrowCenter: 26px;

  font-weight: 700;
  animation: ${tooltipIntro} 1s;
  
  left: calc(var(--maxDotSize) / 2 - var(--tooltipEdgeToArrowCenter));
  
  @media (min-width: 960px) {
    left: calc(var(--negativeDotSize) / 2 - var(--padding) - var(--tooltipEdgeToArrowCenter));
  }

  .tooltipIcon {
    animation: ${arrowBounce} 1s infinite;
    margin-right: 0.75rem;
  }
`

const TooltipText = styled.div`
`

const TutorialTooltip = ({ isVisible, priorityEditorIsOpen }) => {

  return (
    <TooltipWrapper isVisible={isVisible}>
      {priorityEditorIsOpen ? (
        <TooltipText>Adjust the circle size with the slider to indicate priority</TooltipText>
      ):(
        <>
          <SvgArrowDown className="tooltipIcon" />
          <TooltipText>Adjust priority here</TooltipText>
        </>
      )}
    </TooltipWrapper>
  )
}

export default TutorialTooltip
