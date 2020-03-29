import React, { useState, useEffect } from 'react';
import './App.css';
import styled from '@emotion/styled'
import useLocalStorage from './useLocalStorage'
import ToggleButton, { ToggleButtonGroup, ToggleButtonOption } from './components/toggle-button'
import Task from './components/task'
import Mousetrap from 'mousetrap'
import Intro from './components/intro';
import { exampleTasks } from './example-tasks';
import AboutModal from './components/about-modal';

const GlobalContainer = styled.div`
  .headerButtonsSpacer {
    width: 0;
    height: 1rem;
    flex-shrink: 0;
    
    @media (max-width: 799px) {
      width: var(--pagePaddingX);
    }
  }
`

const MainHeader = styled.header`
  --headerContentWidth: calc(var(--pageMaxWidth) - var(--pagePaddingX)*2);

  border-bottom: 1px solid var(--border);
  background-color: var(--background);
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--headerPaddingX);
`

const MainHeaderContent = styled.div`
  width: var(--headerContentWidth);
  max-width: 100%;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  overflow: auto;

  @media (max-width: 959px) {
    padding: var(--pagePaddingX) 0 var(--pagePaddingX) var(--pagePaddingX);
  }
`

const MainHeaderSideSection = styled.div`
  padding: var(--pagePaddingX);
  font-weight: 500;
  
  &.MainHeaderLeftSection {
    border-right: 1px solid var(--border);
    font-size: 1.2rem;
    font-family: var(--themeFont);
  }
  
  &.MainHeaderRightSection {
    text-align: right;
    border-left: 1px solid var(--border);
  }

  @media (max-width: 959px) {
    &.MainHeaderLeftSection {
      display: none;
    }
  }
  
  @media (min-width: 960px) {
    &.MainHeaderLeftSection,
    &.MainHeaderRightSection {
      border: 0;
    }

    width: 100%;
    max-width: calc((100vw - var(--headerContentWidth) - var(--headerPaddingX) * 2) / 2);
  }
`

const TaskListContainer = styled.ul`
  max-width: var(--pageMaxWidth);
  padding: 1rem var(--pagePaddingX) 8rem var(--pagePaddingX);
  margin: 0 auto;
`

const NewTaskButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 1rem;
`

const TaskList = ({
  tasks,
  setTasks,
  makeEditedTitle,
  makeEditedPriority,
  toggleCompleteTask,
  deleteTask,
  taskCompleted,
  order,
  toggleRemoveFocus,
  setTooltipSeenTimes,
  tooltipSeenTimes,
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
            prorityOnSave={e => setTasks(makeEditedPriority(task.id, e.target.value))}
            makeEditedPriority={makeEditedPriority}
            setTasks={setTasks}
            storedTaskPrority={task.prority}
            toggleRemoveFocus={toggleRemoveFocus}
            setTooltipSeenTimes={setTooltipSeenTimes}
            tooltipSeenTimes={tooltipSeenTimes}
          />
        )
      })}
    </>
  )
}


function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', exampleTasks)
  const [taskCompleted, setTaskCompleted] = useState(true)
  const [order, setOrder] = useLocalStorage('order', 'dateAdded')
  const [darkModeOn, setDarkModeOn] = useLocalStorage('darkModeOn', false)
  const [monoOn, setMonofOn] = useLocalStorage('monoOn', false)
  const [smallTextOn, setSmallTextOn] = useLocalStorage('smallTextOn', false)
  const [tooltipSeenTimes, setTooltipSeenTimes] = useLocalStorage('tooltipSeenTimes', 0)
  const [aboutModalIsOpen, setAboutModalIsOpen] = useState(false)
  
  if(darkModeOn) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
  if(monoOn) {
    document.body.classList.add('mono')
  } else {
    document.body.classList.remove('mono')
  }
  if(smallTextOn) {
    document.body.classList.add('smallText')
  } else {
    document.body.classList.remove('smallText')
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
  
  const toggleRemoveFocus = () => {
    let result = []

    tasks.map((task) => {
      if(task.focused) {
        task.focused = false
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
        title: 'New task',
        prority: 1,
        completed: false,
        dateAdded: new Date(),
        focused: true,
      }
    )

    tasks.map((task) => {
      return result.push(task)
    })

    return result
  }

  const pendingAmount = tasks.filter(task => task.completed === false).length
  const completedAmount = tasks.filter(task => task.completed === true).length

  useEffect(() => {
    Mousetrap.bind('alt+n', event => {
      event.preventDefault();
      setTasks(addTask())
    });
    return () => {
      Mousetrap.unbind('alt+n');
    };
  });
  
  useEffect(() => {
    Mousetrap.bind('shift+c+l', event => {
      event.preventDefault();
      localStorage.clear()
    });
    return () => {
      Mousetrap.unbind('shift+c+l');
    };
  });
  
  return (
    <GlobalContainer>
      <Intro />
      {aboutModalIsOpen && (
        <AboutModal setAboutModalIsOpen={setAboutModalIsOpen} />
      )}
      <MainHeader>
        <MainHeaderSideSection className="MainHeaderLeftSection">
          Matter.
        </MainHeaderSideSection>
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
          
          <ToggleButtonGroup className="headerButtons headerButtonsRight">
            <ToggleButton onClick={() => setDarkModeOn(!darkModeOn)} className="ToggleButton">
              <ToggleButtonOption isActive={!darkModeOn} className="ToggleButtonOption">Light</ToggleButtonOption>
              <ToggleButtonOption isActive={darkModeOn} className="ToggleButtonOption">Dark</ToggleButtonOption>
            </ToggleButton>
          </ToggleButtonGroup>
          
          <ToggleButtonGroup className="headerButtons">
            <ToggleButton onClick={() => setMonofOn(!monoOn)} className="ToggleButton">
              <ToggleButtonOption isActive={!monoOn} className="ToggleButtonOption">
                <span style={{ fontFamily: 'var(--mono)', lineHeight: 1 }}>A</span>
              </ToggleButtonOption>
              <ToggleButtonOption isActive={monoOn} className="ToggleButtonOption">
                <span style={{ fontFamily: 'var(--sans)', lineHeight: 1 }}>A</span>
              </ToggleButtonOption>
            </ToggleButton>
          </ToggleButtonGroup>
          
          <ToggleButtonGroup className="headerButtons fontButtons">
            <ToggleButton onClick={() => setSmallTextOn(!smallTextOn)} className="ToggleButton">
              <ToggleButtonOption isActive={!smallTextOn} className="ToggleButtonOption">
                <span>T</span>
              </ToggleButtonOption>
              <ToggleButtonOption isActive={smallTextOn} className="ToggleButtonOption">
                <span style={{ fontSize: '70%' }}>T</span>
              </ToggleButtonOption>
            </ToggleButton>
          </ToggleButtonGroup>

          <div className="headerButtonsSpacer"/>
        </MainHeaderContent>
        <MainHeaderSideSection
          className="MainHeaderRightSection"
        >
          <ToggleButton onClick={() => setAboutModalIsOpen(true)}>
            About
          </ToggleButton>
        </MainHeaderSideSection>
      </MainHeader>
      <TaskListContainer key={order}>

        {taskCompleted && (
          <NewTaskButtonSection>
            <ToggleButton isAccent onClick={() => setTasks(addTask())}>
              New<span style={{ opacity: 0.7, paddingLeft: '0.5em' }}> (alt + n)</span>
            </ToggleButton>
          </NewTaskButtonSection>
        )}

        <TaskList
          tasks={tasks}
          order={order}
          setTasks={setTasks}
          makeEditedTitle={makeEditedTitle}
          makeEditedPriority={makeEditedPriority}
          toggleCompleteTask={toggleCompleteTask}
          deleteTask={deleteTask}
          taskCompleted={taskCompleted}
          toggleRemoveFocus={toggleRemoveFocus}
          setTooltipSeenTimes={setTooltipSeenTimes}
          tooltipSeenTimes={tooltipSeenTimes}
        />
        
      </TaskListContainer>
    </GlobalContainer>
  );
}

export default App;
