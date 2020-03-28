import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ToggleButton from './toggle-button'
import SvgDots from './dots'
import { keyframes } from '@emotion/core'
import useLocalStorage from '../useLocalStorage'

const animateOutDuration = 500

const dotsIntro = keyframes`
  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
`

const contentIntro = keyframes`
  100% {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  background-color: white;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: ${animateOutDuration}ms;
  opacity: ${props => props.animateOut ? 0 : 1};
  transform: ${props => props.animateOut ? 'scale(1.05)' : 'scale(1)'};
`

const Content = styled.div`
  position: relative;
  padding: 0 1rem;
  opacity: 0;
  animation: ${contentIntro} 1s 2s forwards;
`

const Background = styled.div`
  position: absolute;
  margin-top: -4rem;

  .SvgDots {
    transform: scale(1);
    transform-origin: center;
  }
  
  .SvgDots circle {
    transform: scale(3);
    transform-origin: center;
    animation: ${dotsIntro} 1s forwards cubic-bezier(0, 1, 1, 1);

    &:nth-of-type(1) { transform: translate(20rem, 40rem) scale(1.2); animation-duration: 6s }
    &:nth-of-type(2) { transform: translate(-26rem, 15rem) scale(1.2); animation-duration: 7s }
    &:nth-of-type(3) { transform: translate(-22rem, 26rem) scale(1.2); animation-duration: 6s }
    &:nth-of-type(4) { transform: translate(41rem, 11rem) scale(1.2); animation-duration: 9s }
    &:nth-of-type(5) { transform: translate(-12rem, -16rem) scale(1.2); animation-duration: 6s }
    &:nth-of-type(6) { transform: translate(10rem, 10rem) scale(1.2); animation-duration: 6s }
    &:nth-of-type(7) { transform: translate(-26rem, 26rem) scale(1.2); animation-duration: 8s }
    &:nth-of-type(8) { transform: translate(-16rem, -12rem) scale(1.2); animation-duration: 7s }
    &:nth-of-type(9) { transform: translate(-13rem, 4rem) scale(1.2); animation-duration: 5s }
    &:nth-of-type(10) { transform: translate(-33rem, -13rem) scale(1.2); animation-duration: 8.5s }
    &:nth-of-type(11) { transform: translate(-10rem, -34rem) scale(1.2); animation-duration: 7.5s }
    &:nth-of-type(12) { transform: translate(1rem, -21rem) scale(1.2); animation-duration: 11s }
    &:nth-of-type(13) { transform: translate(18rem, -21rem) scale(1.2); animation-duration: 10s }
    &:nth-of-type(14) { transform: translate(4rem, -18rem) scale(1.2); animation-duration: 15s }
    &:nth-of-type(15) { transform: translate(2rem, -10rem) scale(1.2); animation-duration: 6.2s }
    &:nth-of-type(16) { transform: translate(10rem, -4rem) scale(1.2); animation-duration: 6.4s }
    &:nth-of-type(17) { transform: translate(14rem, 15rem) scale(1.2); animation-duration: 6s }
    &:nth-of-type(18) { transform: translate(-8rem, -8rem) scale(1.2); animation-duration: 6s }
    &:nth-of-type(19) { transform: translate(24rem, -14rem) scale(1.2); animation-duration: 6s }
    &:nth-of-type(20) { transform: translate(-20rem, 5rem) scale(1.2); animation-duration: 14s }
    &:nth-of-type(21) { transform: translate(15rem, -15rem) scale(1.2); animation-duration: 6s }
  }
`

const Text = styled.div`
  font-family: var(--mono);
  font-size: 1.1rem;
  margin-bottom: 1rem;
`

const Intro = () => {
  const [isClosing, setIsClosing] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [introIsSeen, setIntroIsSeen] = useLocalStorage('introIsSeen', false)

  const handleIntroClose = () => {
    setIsClosing(true)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if(isClosing) {
        setIsOpen(false)
        setIntroIsSeen(true)
      }
    }, animateOutDuration);
    return () => clearTimeout(timer);
  }, [isClosing, setIntroIsSeen]);

  return (
    <>
    {!introIsSeen && isOpen && (
    <Wrapper animateOut={isClosing}>
      <Background>
        <SvgDots />
      </Background>
      <Content>
        <Text className="Text">
          This is <span style={{ fontWeight: 700 }}>Matter</span>. A task manager that highlights what matters most to you.
        </Text>
        <ToggleButton onClick={() => handleIntroClose()}>
          Open Matter
        </ToggleButton>
      </Content>
    </Wrapper>
    )}
    </>
  )
}

export default Intro