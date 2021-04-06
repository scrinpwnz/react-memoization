import { makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import React, { FC, ReactText } from 'react'
import { IInitialArray } from '../model'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    width: 64,
    height: 64,
    top: 0,
    left: 0,
    display: 'grid',
    placeItems: 'center',
    zIndex: 0,
    border: theme.palette.text.secondary,
    borderRadius: theme.spacing(2),
    background: theme.palette.background.default,
    overflow: 'hidden',
    boxShadow: `
        inset 0px 2px 4px -1px rgb(0 0 0 / 20%),
        inset 0px  4px 5px 0px rgb(0 0 0 / 14%),
        inset 0px 1px 10px 0px rgb(0 0 0 / 12%)
    `
  }
}))

interface Props {
  value?: ReactText
}

const InitialArray: FC<Props> = ({ value }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant={'h4'} color={'textSecondary'}>
        {value}
      </Typography>
    </div>
  )
}

export default InitialArray
