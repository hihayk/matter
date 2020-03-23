import styled from '@emotion/styled'

const Button = styled.button`
  font: inherit;
  color: var(--accent);
  background-color: var(--accentXLight);
  border: none;
  padding: 0.5rem 1rem;

  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  line-height: 1.47;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--accent);
  }
`

export default Button