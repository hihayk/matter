import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled'
import ToggleButton from './toggle-button'
import SvgCheck from '../icons/check';
import IconButton from './icon-button';
import SvgCross from '../icons/cross';

const TaskWrapper = styled.li`
  display: flex;
  align-items: center;
  min-height: var(--taskPaddingY);
  border-bottom: 1px solid var(--border);
  position: relative;
  background-color: var(--background);
  ${props => props.isVisible && 'display: none'};
  ${props => props.editorIsOpen ? 'z-index: 11' : 'z-index: 0'};
  ${props => props.editorIsOpen && `
    box-shadow: calc(50rem * -1 + 1rem*2) 0 var(--background), calc(50rem - 1rem*2) 0 var(--background);
  `};
`

const TaskBackdrop = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  background: var(--backdrop);
  top: 0;
  left: 0;
  z-index: 10;
`

const TitleSection = styled.div`
`

const Title = styled.button`
  font: inherit;
  font-size: var(--titleSize);
  color: inherit;
  border: none;
  cursor: text;
  padding: 0;
  font-family: var(--themeFont);
  letter-spacing: var(--themeFontLS);
  background-color: transparent;
  ${props=> props.isCompleted && `text-decoration: line-through;`}
  text-align: left;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 1px var(--accent);
  }
`

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

const PriorityDotSection = styled.div`
  width: var(--maxDotSize);
  height: var(--maxDotSize);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: absolute;
  left: calc(var(--maxDotSize) * -1 - 1rem);
`

const TitleInput = styled.input`
  font: inherit;
  font-size: var(--titleSize);
  color: inherit;
  border: none;
  padding: 1px 0 0 0;
  flex-grow: 1;
  font-family: var(--themeFont);
  letter-spacing: var(--themeFontLS);
  background-color: transparent;
  margin-right: 1rem;

  &:focus {
    outline: none;
  }
`

const TitleForm = styled.form`
  display: flex;
  align-items: center;
  ${props => props.isVisible ? '' : `
    opacity: 0;
    position: absolute;
    left: -100vw;
    width: 0;
    height: 0`
  };
`

const PriorityForm = styled.form`
  display: flex;
  min-height: 22px;
  align-items: center;
  justify-content: space-between;
  ${props => props.isVisible ? '' : `
    opacity: 0;
    position: absolute;
    left: -100vw;
    width: 0;
    height: 0`
  };

  .ToggleButton {
    margin-left: auto;
  }
`

const PrioritySliderWrapper = styled.div`
  width: 100%;
  max-width: 30rem;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    width: calc(100% - 18px);
    height: 2px;
    background-image: linear-gradient(90deg, var(--body), var(--body) 90%, transparent 90%, transparent 100%);
    background-size: 11.1111% 1px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 2px;
    z-index: -1;
  }
`

const PrioritySlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 22px;
  border-radius: 0px;
  background: none;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%; 
    background: var(--body);
    cursor: pointer;
    top: 3px;
    position: relative;
  }

  &::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--body);
    cursor: pointer;
    top: 3px;
    position: relative;
  }

  &:focus::-webkit-slider-thumb {
    box-shadow: inset 0 0 0 2px var(--accent), inset 0 0 0 4px var(--background);
  }
  &:focus::-moz-range-thumb {
    box-shadow: inset 0 0 0 2px var(--accent), inset 0 0 0 4px var(--background);
  }
`

const FormSection = styled.div`
  flex-grow: 1;
`

const TaskActionsSection = styled.div`
  display: flex;

  .IconButton + .IconButton {
    margin-left: 0.5rem;
  }
`

const PriorityDot = ({ prority, onClick }) => {
  return (
    <PriorityDotWrapper onClick={onClick}>
      <Dot prority={prority} style={{ '--dotSize' : `calc(${prority}rem / var(--dotRatio))` }}/>
    </PriorityDotWrapper>
  )
}

const Task = ({ task, titleInputOnChange, completeOnCLick, deleteOnCLick, isVisible, makeEditedPriority, setTasks, storedTaskPrority }) => {
  const [titleEditorIsOpen, setTitleEditorIsOpen] = useState(false)
  const [priorityEditorIsOpen, setPriorityEditorIsOpen] = useState(false)
  const [priorityValue, setPriorityValue] = useState(task.prority)

  const editorIsOpen = titleEditorIsOpen || priorityEditorIsOpen

  const closeAllEditors = () => {
    setTitleEditorIsOpen(false)
    setPriorityEditorIsOpen(false)
  }

  const titleInput = useRef(null);
  const priorityInput = useRef(null);

  const handleTitleClick = () => {
    setTitleEditorIsOpen(true)
    titleInput.current.select();
  }
  
  const handlePriorityClick = () => {
    setPriorityEditorIsOpen(true)
    priorityInput.current.focus();
  }

  const handleSave = (value, event) => {
    event.preventDefault();
    closeAllEditors(false)
    setPriorityValue(value)
    setTasks(makeEditedPriority(task.id, value))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if(!priorityEditorIsOpen) {
        setPriorityValue(task.prority)
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [priorityEditorIsOpen, priorityValue, task.prority]);

  return (
    <>
      <TaskWrapper editorIsOpen={editorIsOpen} isVisible={isVisible}>
        
        <PriorityDotSection>
          <PriorityDot prority={editorIsOpen ? priorityValue : task.prority} onClick={() => handlePriorityClick()}/>
        </PriorityDotSection>
        <TitleSection>

          {!titleEditorIsOpen && !priorityEditorIsOpen && (
            <Title onClick={() => handleTitleClick()} isCompleted={task.completed}>
              {task.title}
            </Title>
          )}
          
        </TitleSection>

        <FormSection>
          <TitleForm isVisible={titleEditorIsOpen && !priorityEditorIsOpen}>
            <TitleInput
              value={task.title}
              onChange={titleInputOnChange}
              ref={titleInput}
            />
            <ToggleButton isAccent onClick={(e) => handleSave(priorityValue, e)}>Done</ToggleButton>
          </TitleForm>

          <PriorityForm isVisible={priorityEditorIsOpen}>
            <PrioritySliderWrapper>
              <PrioritySlider
                type="range"
                min={1}
                max={10}
                value={priorityValue}
                onChange={e => setPriorityValue(e.target.value)}
                ref={priorityInput}
              />
            </PrioritySliderWrapper>
            
            <ToggleButton isAccent onClick={(e) => handleSave(priorityValue, e)}>Done</ToggleButton>
          </PriorityForm>
        </FormSection>

        {!editorIsOpen && (
          <>
            <TaskActionsSection>

              <IconButton icon={<SvgCheck />} size="var(--maxDotSize)" onClick={completeOnCLick} isChecked={task.completed}/>
              <IconButton icon={<SvgCross />} size="var(--maxDotSize)" onClick={deleteOnCLick}/>

            </TaskActionsSection>
          </>
        )}
      </TaskWrapper>

      {editorIsOpen && (
        <TaskBackdrop onClick={(e) => handleSave(priorityValue, e)}/>
      )}
    </>
  )
}

export default Task