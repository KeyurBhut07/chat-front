import { styled } from '@mui/material'
import { Link as LinkCoponent } from 'react-router-dom'
import { grayColor } from '../constants/color'

export const VisuallyHiddenInput = styled('input')({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
})

export const Link = styled(LinkCoponent)`
  text-decoration: none;
  color: black;
  padding: '1rem';
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

export const InputBox = styled('input')({
  width: '100%',
  height: '100%',
  border: 'none',
  outline: '0none',
  padding: '0 3rem',
  borderRadius: '1.5rem',
  backgroundColor: `${grayColor}`,
  fontSize: '1rem',
})

export const SearchField = styled('input')`
  padding: 1rem 2rem;
  width: 20vmax;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: #f1f1f1;
  font-size: 1.1rem;
`

export const CurveButton = styled('button')`
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: black;
  color: white;
  font-size: 1.1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`
