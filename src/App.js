import React, { useState, useRef } from 'react';
import './App.css';
import styled from '@emotion/styled'
import useLocalStorage from './useLocalStorage'

const GlobalContainer = styled.div`
  --dotSize: 5rem;
  --maxDotSize: 5rem;
`

const MainHeader = styled.header`
  border-bottom: 1px solid var(--border);
  background-color: var(--background);
  position: sticky;
  top: 0;
  z-index: 1;
`

const MainHeaderContent = styled.div`
  max-width: 50rem;
  padding: 3rem 1rem;
  margin: 0 auto;
  display: flex;
`

const TaskListContainer = styled.ul`
  max-width: 50rem;
  padding: 0 1rem;
  margin: 0 auto;
`

const TaskWrapper = styled.li`
  display: flex;
  align-items: center;
  min-height: calc(var(--maxDotSize) + 1rem);
  border-bottom: 1px solid var(--border);
  position: relative;
  background-color: var(--background);
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
  font-size: var(--text-l);
  color: inherit;
  border: none;
  cursor: text;
`

const PriorityDotWrapper = styled.button`
  width: var(--maxDotSize);
  height: var(--maxDotSize);
  border-radius: 100%;
  background-color: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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

const ToggleButton = styled.button`
  font: inherit;
  color: inherit;
  padding: 0.5rem 0.75rem;
  border: none;
  background: none;
  cursor: pointer;
  box-shadow: inset 0 0 0 ${props => props.isChecked ? '2px black' : '1px #aaa'};

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 ${props => props.isChecked ? '2px var(--accent)' : '1px var(--accent)'};
  }
`

const ToggleButtonGroup = styled.div`
  & .ToggleButton + .ToggleButton {
    margin-left: 0.25rem;
  }

  &.statusButtons {
    margin-right: 4rem;
  }
`

const TitleInput = styled.input`
  font: inherit;
  font-size: var(--text-l);
  color: inherit;
  border: none;
  padding: 0;
  /* margin-left: calc(0.5rem * -1 - 1px); */

  &:focus {
    outline: none;
  }
`

const TitleForm = styled.form`
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
  ${props => props.isVisible ? '' : `
    opacity: 0;
    position: absolute;
    left: -100vw;
    width: 0;
    height: 0`
  };
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
    background-image: linear-gradient(90deg, #000, #000 90%, transparent 90%, transparent 100%);
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

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%; 
    background: black;
    cursor: pointer;
    top: 3px;
    position: relative;
  }

  &::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: black;
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

const PriorityDot = ({ prority, onClick }) => {
  return (
    <PriorityDotWrapper onClick={onClick}>
      <Dot prority={prority} style={{ '--dotSize' : `${prority / 2}rem` }}/>
    </PriorityDotWrapper>
  )
}

const exampleTasks = [
  {
    id: 1,
    title: 'Buy tool to change pedals',
    prority: 4,
    completed: false,
  },
  {
    id: 2,
    title: 'Wash the bike',
    prority: 2,
    completed: false,
  },
  {
    id: 3,
    title: 'Get reel tape',
    prority: 10,
    completed: true,
  },
  {
    id: 4,
    title: 'Buy center table',
    prority: 1,
    completed: true,
  },
  {
    id: 5,
    title: 'Wash the bike',
    prority: 7,
    completed: false,
  },
  {
    id: 6,
    title: 'Get reel tape',
    prority: 3,
    completed: true,
  },
  {
    id: 7,
    title: 'Buy center table',
    prority: 1,
    completed: true,
  },
  {
    id: 8,
    title: 'Get reel tape',
    prority: 8,
    completed: true,
  },
  {
    id: 9,
    title: 'Buy center table',
    prority: 1,
    completed: true,
  },
  {
    id: 10,
    title: 'Wash the bike',
    prority: 6,
    completed: false,
  },
  {
    id: 11,
    title: 'Get reel tape',
    prority: 3,
    completed: true,
  },
  {
    id: 12,
    title: 'Buy center table',
    prority: 1,
    completed: true,
  },
]

const Task = ({ task, titleInputOnChange, priorityInputOnChange, completeOnCLick, deleteOnCLick }) => {
  const [titleEditorIsOpen, setTitleEditorIsOpen] = useState(false)
  const [priorityEditorIsOpen, setPriorityEditorIsOpen] = useState(false)

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

  return (
    <>
      <TaskWrapper editorIsOpen={editorIsOpen}>
        
        <PriorityDotSection>
          <PriorityDot prority={task.prority} onClick={() => handlePriorityClick()}/>
        </PriorityDotSection>
        <TitleSection>

          {!titleEditorIsOpen && !priorityEditorIsOpen && (
            <Title onClick={() => handleTitleClick()}>
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
            <button onClick={() => closeAllEditors(false)}>Done</button>
          </TitleForm>

          <PriorityForm isVisible={priorityEditorIsOpen}>
            <PrioritySliderWrapper>
              <PrioritySlider
                type="range"
                min={1}
                max={10}
                value={task.prority}
                onChange={priorityInputOnChange}
                ref={priorityInput}
              />
            </PrioritySliderWrapper>
            <button onClick={() => closeAllEditors(false)}>Done</button>
          </PriorityForm>
        </FormSection>

        <button style={{ margin: '0 1rem 0 auto' }} onClick={completeOnCLick}>
          {task.completed ? 'Reopen' : 'Complete'}
        </button>
        <button onClick={deleteOnCLick}>delete</button>
      </TaskWrapper>

      {editorIsOpen && (
        <TaskBackdrop onClick={() => closeAllEditors()}/>
      )}
    </>
  )
}


function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', exampleTasks)
  const [statusFilter, setStatusFilter] = useState('pending')

  const makeEditedTitle = (editedId, newTitle) => {
    let result = []

    tasks.map((task) => {
      if(editedId === task.id) {
        task.title = newTitle
      }

      return result.push(task)
    })

    return result
  }
  
  const makeEditedPriority = (editedId, newPriority) => {
    let result = []

    tasks.map((task) => {
      if(editedId === task.id) {
        task.prority = newPriority
      }

      return result.push(task)
    })

    return result
  }
  
  const toggleCompleteTask = (editedId) => {
    let result = []

    tasks.map((task) => {
      if(editedId === task.id) {
        task.completed = !task.completed
      }

      return result.push(task)
    })

    return result
  }
  
  const deleteTask = (editedId) => {
    return tasks.filter(task => task.id !== editedId)
  }

  const getHighestId = () => {
    let result = []
    
    tasks.map((task) => {
      return result.push(task.id)
    })

    return result.length > 0 ? Math.max(...result) : 0
  }

  const addTask = () => {
    let result = []

    result.push(
      {
        id: getHighestId() + 1,
        title: 'This is a new task',
        prority: 1,
        completed: false,
      }
    )

    tasks.map((task) => {
      return result.push(task)
    })

    return result
  }

  const filteredTasks =
    statusFilter === 'pending'
      ? tasks.filter(task => task.completed === false)
      : tasks.filter(task => task.completed === true)

  
  return (
    <GlobalContainer>
      <MainHeader>
        <MainHeaderContent>
          <ToggleButtonGroup className="statusButtons">
            <ToggleButton isChecked={statusFilter === 'pending'} className="ToggleButton" onClick={() => setStatusFilter('pending')}>Pending</ToggleButton>
            <ToggleButton isChecked={statusFilter === 'completed'} className="ToggleButton" onClick={() => setStatusFilter('completed')}>Completed</ToggleButton>
          </ToggleButtonGroup>
          
          <ToggleButtonGroup>
            <ToggleButton isChecked className="ToggleButton">Highest Priority</ToggleButton>
            <ToggleButton className="ToggleButton">Date added</ToggleButton>
          </ToggleButtonGroup>
        </MainHeaderContent>
      </MainHeader>
      <TaskListContainer>

        <button onClick={() => setTasks(addTask())}>
          New task
        </button>

        {filteredTasks.map((task, index) => {

          return (
            <Task
              task={task}
              key={index}
              titleInputOnChange={e => setTasks(makeEditedTitle(task.id, e.target.value))}
              priorityInputOnChange={e => setTasks(makeEditedPriority(task.id, e.target.value))}
              completeOnCLick={() => setTasks(toggleCompleteTask(task.id))}
              deleteOnCLick={() => setTasks(deleteTask(task.id))}              
            />
          )
        })}
      </TaskListContainer>
    </GlobalContainer>
  );
}

export default App;
