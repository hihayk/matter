import React, { useState } from 'react';
import './App.css';
import styled from '@emotion/styled'
import useLocalStorage from './useLocalStorage'
import ToggleButton, { ToggleButtonGroup, ToggleButtonOption } from './components/toggle-button'
import Task from './components/task'

const GlobalContainer = styled.div`
  
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
  padding: 2rem 1rem;
  margin: 0 auto;
  display: flex;
`

const TaskListContainer = styled.ul`
  max-width: 50rem;
  padding: 1rem 1rem 8rem 1rem;
  margin: 0 auto;
`

const NewTaskButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 0.5rem;
`

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
            prorityOnSave={e => setTasks(makeEditedPriority(task.id, e.target.value))}
            makeEditedPriority={makeEditedPriority}
            setTasks={setTasks}
            storedTaskPrority={task.prority}
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
        title: 'New task click to edit',
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
          
          <ToggleButtonGroup className="headerButtons" style={{ marginLeft: 'auto' }}>
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
          
          <ToggleButtonGroup className="headerButtons">
            <ToggleButton onClick={() => setSmallTextOn(!smallTextOn)} className="ToggleButton">
              <ToggleButtonOption isActive={!smallTextOn} className="ToggleButtonOption">
                <span>T</span>
              </ToggleButtonOption>
              <ToggleButtonOption isActive={smallTextOn} className="ToggleButtonOption">
                <span style={{ fontSize: '70%' }}>T</span>
              </ToggleButtonOption>
            </ToggleButton>
          </ToggleButtonGroup>
        </MainHeaderContent>
      </MainHeader>
      <TaskListContainer key={order}>

        {taskCompleted && (
          <NewTaskButtonSection>
            <ToggleButton isAccent onClick={() => setTasks(addTask())}>
              New task
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
        />
        
      </TaskListContainer>
    </GlobalContainer>
  );
}

export default App;
