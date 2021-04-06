import { makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import React, { FC, useMemo } from 'react'
import { ICountingArray } from '../model'
import { animated, config, Spring } from 'react-spring'
import { green, purple } from '@material-ui/core/colors'
import cn from 'classnames'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    gap: theme.spacing(1),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(3)
  },
  item: {
    display: 'grid',
    placeItems: 'center',
    gridGap: theme.spacing(0.5),
    padding: theme.spacing(1),
    color: purple[900],
    transition: theme.transitions.create(['background-color', 'color'], {
      duration: 300,
      easing: 'ease'
    })
  },
  selected: {
    backgroundColor: purple[100]
  },
  index: {
    display: 'flex',
    justifyContent: 'center',
    width: 16
  },
  spot: {
    position: 'relative',
    display: 'grid',
    gridTemplateRows: 'repeat(auto-fill, 64px)',
    width: 64,
    gridGap: 8
  }
}))

interface Props {
  state: ICountingArray[]
}

const CountingArray: FC<Props> = ({ state }) => {
  const classes = useStyles()

  const prevData = useMemo<number[]>(() => [], [])

  return (
    <Paper className={classes.root} elevation={6}>
      {state.map((item, index) => {
        return (
          <div>
            <Paper className={cn(classes.item, { [classes.selected]: item.selected })} variant={'outlined'}>
              <Typography variant={'h4'} color={'inherit'} align={'center'}>
                {item.value}
              </Typography>
            </Paper>
            <Typography variant={'h6'} color={'textSecondary'} align={'center'}>
              {index}
            </Typography>
            <Spring
              config={config.wobbly}
              onResolve={() => (prevData[index] = item.numberOfElements)}
              from={{ height: prevData[index] ?? 0 }}
              to={{
                height: item.numberOfElements * 64 + (item.numberOfElements > 1 ? (item.numberOfElements - 1) * 8 : 0)
              }}>
              {props => <animated.div key={index} ref={item.ref} className={classes.spot} style={props} />}
            </Spring>
          </div>
        )
      })}
    </Paper>
  )
}

export default CountingArray
