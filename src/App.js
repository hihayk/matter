import React, { useState, useRef } from 'react';
import './App.css';
import styled from '@emotion/styled'
import useLocalStorage from './useLocalStorage'
import ToggleButton, { ToggleButtonGroup, ToggleButtonOption } from './components/toggle-button'

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
  padding: 0 1rem 8rem 1rem;
  margin: 0 auto;
`

const TaskWrapper = styled.li`
  display: flex;
  align-items: center;
  min-height: calc(var(--maxDotSize) + 0.5rem);
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
  font-size: var(--text-xl);
  color: inherit;
  border: none;
  cursor: text;
  padding: 0;
  font-family: Marr Sans Web;
  background-color: transparent;
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
  font-size: var(--text-xl);
  color: inherit;
  border: none;
  padding: 1px 0 0 0;
  flex-grow: 1;
  font-family: Marr Sans Web;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`

const TitleForm = styled.div`
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

const PriorityForm = styled.div`
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
    dateAdded: new Date('11/14/2019 00:01'),
  },
  {
    id: 2,
    title: 'Wash the bike',
    prority: 2,
    completed: false,
    dateAdded: new Date('11/14/2013 00:02'),
  },
  {
    id: 3,
    title: 'Get reel tape',
    prority: 10,
    completed: true,
    dateAdded: new Date('11/14/2013 00:03'),
  },
  {
    id: 4,
    title: 'Buy center table',
    prority: 1,
    completed: true,
    dateAdded: new Date('11/14/2018 00:04'),
  },
  {
    id: 5,
    title: 'Wash the bike',
    prority: 7,
    completed: false,
    dateAdded: new Date('11/14/2013 00:05'),
  },
  {
    id: 6,
    title: 'Get reel tape',
    prority: 3,
    completed: true,
    dateAdded: new Date('11/14/2013 00:06'),
  },
  {
    id: 7,
    title: 'Buy center table',
    prority: 1,
    completed: true,
    dateAdded: new Date('11/14/2013 00:07'),
  },
  {
    id: 8,
    title: 'Get reel tape',
    prority: 8,
    completed: true,
    dateAdded: new Date('11/14/2013 00:08'),
  },
  {
    id: 9,
    title: 'Buy center table',
    prority: 1,
    completed: true,
    dateAdded: new Date('11/14/2013 00:09'),
  },
  {
    id: 10,
    title: 'Wash the bike',
    prority: 6,
    completed: false,
    dateAdded: new Date('11/14/2013 00:10'),
  },
  {
    id: 11,
    title: 'Get reel tape',
    prority: 3,
    completed: true,
    dateAdded: new Date('11/14/2013 00:11'),
  },
  {
    id: 12,
    title: 'Buy center table',
    prority: 1,
    completed: true,
    dateAdded: new Date('11/14/2013 00:12'),
  },
]

const Task = ({ task, titleInputOnChange, priorityInputOnChange, completeOnCLick, deleteOnCLick, isVisible }) => {
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
      <TaskWrapper editorIsOpen={editorIsOpen} isVisible={isVisible}>
        
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
            <ToggleButton onClick={() => closeAllEditors(false)}>Done</ToggleButton>
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
            <ToggleButton className="ToggleButton" onClick={() => closeAllEditors(false)}>Done</ToggleButton>
          </PriorityForm>
        </FormSection>

        {!editorIsOpen && (
          <>
            <button style={{ margin: '0 1rem 0 auto' }} onClick={completeOnCLick}>
              {task.completed ? 'Reopen' : 'Complete'}
            </button>
            <button onClick={deleteOnCLick}>delete</button>
          </>
        )}
      </TaskWrapper>

      {editorIsOpen && (
        <TaskBackdrop onClick={() => closeAllEditors()}/>
      )}
    </>
  )
}

const TaskList = ({
  tasks,
  setTasks,
  makeEditedTitle,
  makeEditedPriority,
  toggleCompleteTask,
  deleteTask,
  taskCompleted,
  order,
}) => {
  
  const highestPriorityTasks = () => {
    const priorityTasksArray = [...tasks]
    return priorityTasksArray.sort((a, b) => b.prority - a.prority)
  }
  
  const dateAddedTasks = () => {
    const dateAddedTasksArray = [...tasks]
    return dateAddedTasksArray.sort((a, b) => b.dateAdded - a.dateAdded)
  }

  const sortedTasks = () => order === 'highestPriority' ? highestPriorityTasks() : dateAddedTasks()


  return (
    <>
      {sortedTasks().map((task, index) => {
        return (
          <Task
            isVisible={task.completed === taskCompleted}
            task={task}
            key={index}
            titleInputOnChange={e => setTasks(makeEditedTitle(task.id, e.target.value))}
            priorityInputOnChange={e => setTasks(makeEditedPriority(task.id, e.target.value))}
            completeOnCLick={() => setTasks(toggleCompleteTask(task.id))}
            deleteOnCLick={() => setTasks(deleteTask(task.id))}
          />
        )
      })}
    </>
  )
}


function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', exampleTasks)
  const [darkModeOn, setDarkModeOn] = useLocalStorage('darkModeOn', false)
  const [taskCompleted, setTaskCompleted] = useState(true)
  const [order, setOrder] = useLocalStorage('order', 'dateAdded')

  if(darkModeOn) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }

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
        dateAdded: new Date(),
      }
    )

    tasks.map((task) => {
      return result.push(task)
    })

    return result
  }

  const pendingAmount = tasks.filter(task => task.completed === false).length
  const completedAmount = tasks.filter(task => task.completed === true).length
  
  return (
    <GlobalContainer>
      <MainHeader>
        <MainHeaderContent>
          <ToggleButtonGroup className="headerButtons">
            <ToggleButton
              onClick={() => setTaskCompleted(!taskCompleted)}
              className="ToggleButton"
            >
              <ToggleButtonOption isActive={taskCompleted} className="ToggleButtonOption">Pending <span style={{ color: 'var(--dimmed)' }}>{pendingAmount}</span></ToggleButtonOption>
              <ToggleButtonOption isActive={!taskCompleted} className="ToggleButtonOption">Completed <span style={{ color: 'var(--dimmed)' }}>{completedAmount}</span></ToggleButtonOption>
            </ToggleButton>
          </ToggleButtonGroup>
          
          <ToggleButtonGroup className="headerButtons">
            <ToggleButton onClick={() => setOrder(order === 'highestPriority' ? 'dateAdded' : 'highestPriority')} className="ToggleButton">
              <ToggleButtonOption isActive={order === 'highestPriority'} className="ToggleButtonOption">Highest Priority</ToggleButtonOption>
              <ToggleButtonOption isActive={order === 'dateAdded'} className="ToggleButtonOption">Latest</ToggleButtonOption>
            </ToggleButton>
          </ToggleButtonGroup>
          
          <ToggleButtonGroup>
            <ToggleButton onClick={() => setDarkModeOn(!darkModeOn)} className="ToggleButton">
              <ToggleButtonOption isActive={!darkModeOn} className="ToggleButtonOption">Light</ToggleButtonOption>
              <ToggleButtonOption isActive={darkModeOn} className="ToggleButtonOption">Dark</ToggleButtonOption>
            </ToggleButton>
          </ToggleButtonGroup>
        </MainHeaderContent>
      </MainHeader>
      <TaskListContainer key={order}>

        <button onClick={() => setTasks(addTask())}>
          New task
        </button>
        <button onClick={() => localStorage.clear()}>
          Clear localStorage
        </button>

        {order === 'highestPriority' ? (
          <TaskList
            tasks={tasks}
            order={order}
            setTasks={setTasks}
            makeEditedTitle={makeEditedTitle}
            makeEditedPriority={makeEditedPriority}
            toggleCompleteTask={toggleCompleteTask}
            deleteTask={deleteTask}
            taskCompleted={taskCompleted}
          />
        ) : (
          <TaskList
            tasks={tasks}
            order={order}
            setTasks={setTasks}
            makeEditedTitle={makeEditedTitle}
            makeEditedPriority={makeEditedPriority}
            toggleCompleteTask={toggleCompleteTask}
            deleteTask={deleteTask}
            taskCompleted={taskCompleted}
          />
        )}
        
      </TaskListContainer>
    </GlobalContainer>
  );
}

export default App;
