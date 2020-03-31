import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import IconButton from './icon-button'
import SvgCross from '../icons/cross'

const wrapperIntro = keyframes`
  0% {
    opacity: 0;
    transform: translateY(4rem);
  }
`

const backdropIntro = keyframes`
  0% {
    opacity: 0;
  }
`

const AboutModalWrapper = styled.div`
  position: fixed;
  z-index: 1200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 8rem;
  `

const Wrapper = styled.div`
  background-color: var(--background);
  height: 100%;
  z-index: 120;
  position: relative;
  animation: 0.3s ${wrapperIntro};
  `

const Content = styled.div`
  max-width: calc(var(--pageMaxWidth) / 2);
  padding: 2rem var(--pagePaddingX) 4rem var(--pagePaddingX);
  margin: 0 auto;
  `

const CloseSection = styled.div`
  .closeIcon {
    margin-left: auto;
  }
  `

const Backdrop = styled.div`
  height: 100%;
  background-color: var(--backdrop);
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 110;
  animation: 0.3s ${backdropIntro};
`

const AboutModal = ({ setAboutModalIsOpen }) => {
  return (
    <AboutModalWrapper>
      <Backdrop onClick={() => setAboutModalIsOpen(false)}/>
      <Wrapper>
        <Content>
          <CloseSection>
            <IconButton
              className="closeIcon"
              icon={<SvgCross />}
              onClick={() => setAboutModalIsOpen(false)}
            />
          </CloseSection>
          <h1>About Matter</h1>
          <p>
            Less noise, more focus. Matter is a task manager that visually highlights what matters most to you.
          </p>
          <br />
          <h2>
            No account needed
          </h2>
          <p>
            Your tasks are stored in your browser (localStorage). Your data will persist until your computer explodes or you delete your browser.
          </p>
          <br />
          <h2>
            Hidden feature
          </h2>
          <p>
            Matter is voice activated. Say "Ok Matter, add task, walk my dog". If it doesn't work, try louder.
          </p>

          <br />
          <hr />
          <br />

          <p>
            Made by <a href="https://hayk.design" target="_blank" rel="noopener noreferrer">Hayk</a>
          </p>
          <p>
            <a href="https://hayk.design/#/contact" target="_blank" rel="noopener noreferrer">Contact</a>
          </p>
          <p>
            <a href="https://github.com/hihayk/matter" target="_blank" rel="noopener noreferrer">Github</a>
          </p>
        </Content>
      </Wrapper>
    </AboutModalWrapper>
  )
}

export default AboutModal