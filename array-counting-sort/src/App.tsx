import React, { useCallback, useEffect, useMemo, useState } from 'react'
import InitialArray from './components/InitialArray'
import { Button, Container, makeStyles, Theme } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { useAction, useAtom } from '@reatom/react'
import {
  blinkInCountingArrayReaction,
  countingArray,
  initialArray,
  moveContainerAction,
  rootAtom,
  setNumberOfElementsInCountingArrayAction,
  setValueInCountingArrayAction
} from './model'
import ArrayElementPortal from './components/ArrayElementPortal'
import { useForceUpdate } from './hooks'
import ArrayContainerPortal from './components/ArrayContainerPortal'
import CountingArray from './components/CountingArray'
import cn from 'classnames'
import { sleep } from './helpers'
import PlayButton from './components/PlayButton'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    background: green[200]
  },
  mainContainer: {
    height: '100%',
    overflowY: 'auto'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    placeItems: 'center',
    opacity: 100,
    paddingTop: '10rem',
    transition: theme.transitions.create(['opacity'], {
      duration: 1000,
      easing: 'ease'
    })
  },
  hidden: {
    opacity: 0
  }
}))

const App = () => {
  const classes = useStyles()
  const forceUpdate = useForceUpdate()
  const [updateCount, setUpdateCount] = useState(0)
  const [ready, setReady] = useState(false)
  const [disabled, setDisabled] = useState(false)

  console.count('App')

  const atom = useAtom(rootAtom)
  const moveContainer = useAction(moveContainerAction)
  const blinkInCountingArray = useAction(blinkInCountingArrayReaction)
  const setValueInCountingArray = useAction(setValueInCountingArrayAction)
  const setNumberOfElementsInCountingArray = useAction(setNumberOfElementsInCountingArrayAction)

  const moveElement = (
    index: number,
    countingArrayIndex: number,
    countingArrayValue: number,
    countingArrayNumberOfElements: number
  ) => {
    moveContainer({
      index,
      containerRef: atom.countingArray[countingArrayIndex].ref
    })
    setValueInCountingArray({
      index: countingArrayIndex,
      payload: countingArrayValue
    })
    blinkInCountingArray({ index: countingArrayIndex })
    setNumberOfElementsInCountingArray({
      index: countingArrayIndex,
      payload: countingArrayNumberOfElements
    })
  }

  const sumNext = async (index: number, value: number, nextValue: number) => {
    blinkInCountingArray({ index })
    blinkInCountingArray({ index: index + 1 })
    await sleep(600)
    setValueInCountingArray({
      index: index + 1,
      payload: value + nextValue
    })
    blinkInCountingArray({ index: index + 1 })
    await sleep(300)
  }

  const steps = useCallback(async function* steps() {
    const initialArr = [...initialArray]
    const countingArr = [...countingArray]

    let index = 0
    for (const value of initialArr) {
      setDisabled(true)
      moveElement(index++, value, ++countingArr[value], countingArr[value])
      setDisabled(false)
      yield
    }

    for (let i = 0; i < countingArr.length - 1; ++i) {
      setDisabled(true)
      await sumNext(i, countingArr[i], countingArr[i + 1])
      countingArr[i + 1] = countingArr[i] + countingArr[i + 1]
      setDisabled(false)
      yield
    }
  }, [])

  const generator = useMemo(() => steps(), [])

  useEffect(() => {
    if (updateCount < 2) {
      forceUpdate()
      setUpdateCount(updateCount + 1)
    } else {
      setReady(true)
    }
  }, [updateCount])

  return (
    <div className={classes.root}>
      <div className={classes.mainContainer}>
        <Container maxWidth={'md'}>
          <div className={cn(classes.content, { [classes.hidden]: !ready })}>
            <PlayButton disabled={disabled} onClick={() => generator.next()} />
            <InitialArray state={atom.initialArray} />
            <CountingArray state={atom.countingArray} />
            {atom.containers.map((item, index) => (
              <ArrayContainerPortal key={index} index={index} container={item.containerRef.current} />
            ))}
            {atom.elements.map((item, index) => (
              <ArrayElementPortal key={index} index={index} container={item.containerRef.current} />
            ))}
          </div>
        </Container>
      </div>
    </div>
  )
}

export default App
