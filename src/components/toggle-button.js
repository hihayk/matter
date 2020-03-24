import styled from '@emotion/styled'

const ToggleButton = styled.button`
  font: inherit;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  color: ${props => props.isAccent ? 'white' : 'inherit'};
  background-color: ${props => props.isAccent ? 'var(--accent)' : 'transparent'};
  border: 1px solid ${props => props.isAccent ? 'transparent' : 'var(--xDimmed)'};
  
  &:focus {
    border-color: var(--accent);
    outline: ${props => props.isAccent ? '4px solid var(--accentLight)' : 'none'};
  }

  & .ToggleButtonOption + .ToggleButtonOption:before {
    content: '/';
    color: var(--dimmed);
    margin: 0 0.5em;
  }
`

export const ToggleButtonOption = styled.span`
  ${props => props.isActive ? '' : 'color: var(--dimmed)'};
`

export const ToggleButtonGroup = styled.div`
  &.headerButtons + .headerButtons {
    margin-left: 1rem;
  }
`

export default ToggleButton