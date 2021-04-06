import { Button, withStyles } from '@material-ui/core'
import React, { FC, memo } from 'react'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import { purple } from '@material-ui/core/colors'

const StyledButton = withStyles({
  root: {
    borderRadius: '1rem',
    fontSize: '1.25rem',
    background: purple[900],
    padding: '.5rem 1rem',
    '&:hover': {
      background: purple[800]
    }
  },
  endIcon: {
    marginLeft: '.5rem',
    marginRight: '-.25rem'
  },
  iconSizeMedium: {
    '&>:first-child': {
      fontSize: '2.25rem'
    }
  }
})(Button)

interface Props {
  onClick: () => any
  disabled: boolean
}

const PlayButton: FC<Props> = memo(({ onClick, disabled }) => {
  return (
    <StyledButton
      disabled={disabled}
      variant={'contained'}
      color={'primary'}
      endIcon={<SkipNextIcon />}
      onClick={onClick}>
      Следующий шаг
    </StyledButton>
  )
})

export default PlayButton
