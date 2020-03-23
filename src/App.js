import React, { useState } from 'react';
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
`

const TitleSection = styled.div`
  font-size: var(--text-l);
`

const PriorityDotWrapper = styled.button`
  width: var(--dotSize);
  height: var(--dotSize);
  border-radius: 100%;
  background-color: var(--accent);
  border: none;
  cursor: pointer;
  padding: 0;
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

const PriorityDot = ({ prority }) => {
  return (
    <PriorityDotWrapper prority={prority} style={{ '--dotSize' : `${prority / 2}rem` }}/>
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
            <TaskWrapper key={index}>
              <PriorityDotSection>
                <PriorityDot prority={task.prority}/>
              </PriorityDotSection>
              <TitleSection>{task.title}</TitleSection>
              <input
                value={task.title}
                onChange={e => setTasks(makeEditedTitle(task.id, e.target.value))}
              />
              
              <input
                type="range"
                min={1}
                max={10}
                value={task.prority}
                onChange={e => setTasks(makeEditedPriority(task.id, e.target.value))}
              />

              <button style={{ margin: '0 1rem 0 auto' }} onClick={() => setTasks(toggleCompleteTask(task.id))}>
                {task.completed ? 'Reopen' : 'Complete'}
              </button>
              <button onClick={() => setTasks(deleteTask(task.id))}>delete</button>

            </TaskWrapper>
          )
        })}
      </TaskListContainer>
    </GlobalContainer>
  );
}

export default App;
