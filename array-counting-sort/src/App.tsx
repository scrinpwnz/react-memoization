import React, { useCallback, useEffect, useMemo, useState } from 'react'
import InitialArray from './components/InitialArray'
import { Button, Container, makeStyles, Theme } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { useAction, useAtom } from '@reatom/react'
import {
  blinkReaction,
  countingArray,
  initialArray,
  moveContainerAction,
  rootAtom,
  setNumberOfElementsInCountingArrayAction,
  setSelectedAction,
  setValueInCountingArrayAction
} from './model'
import ArrayElementPortal from './components/ArrayElementPortal'
import { useForceUpdate } from './hooks'
import ArrayContainerPortal from './components/ArrayContainerPortal'
import CountingArray from './components/CountingArray'
import cn from 'classnames'
import { sleep } from './helpers'
import PlayButton from './components/PlayButton'
import ResultArray from './components/ResultArray'
import { cloneDeep } from 'lodash'

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
    paddingTop: '4rem',
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
  const setSelected = useAction(setSelectedAction)
  const blink = useAction(blinkReaction)
  const setValueInCountingArray = useAction(setValueInCountingArrayAction)
  const setNumberOfElementsInCountingArray = useAction(setNumberOfElementsInCountingArrayAction)

  const moveElement = (
    index: number,
    arrayIndex: number,
    countingArrayValue: number,
    countingArrayNumberOfElements: number,
    to: 'countingArray' | 'resultArray'
  ) => {
    moveContainer({
      index,
      containerRef: atom[to][arrayIndex].ref
    })
    setValueInCountingArray({
      index: arrayIndex,
      payload: countingArrayValue
    })
    blink({ index: arrayIndex, array: 'countingArray', type: 'selected' })
    setNumberOfElementsInCountingArray({
      index: arrayIndex,
      payload: countingArrayNumberOfElements
    })
  }

  const sumNext = async (index: number, value: number, nextValue: number) => {
    blink({ index, array: 'countingArray', type: 'selected' })
    blink({ index: index + 1, array: 'countingArray', type: 'selected' })
    await sleep(600)
    setValueInCountingArray({
      index: index + 1,
      payload: value + nextValue
    })
    blink({ index: index + 1, array: 'countingArray', type: 'selected' })
    await sleep(300)
  }

  const setNewPosition = async (
    initialArrayIndex: number,
    countingArrayIndex: number,
    resultArrayIndex: number,
    elements: number,
    initialArr: number[]
  ) => {
    setSelected({
      index: initialArrayIndex,
      array: 'initialArray',
      payload: true,
      type: 'selected'
    })
    await sleep(500)
    setSelected({
      index: countingArrayIndex,
      array: 'countingArray',
      payload: true,
      type: 'indexSelected'
    })
    await sleep(1000)
    setSelected({
      index: countingArrayIndex,
      array: 'countingArray',
      payload: true,
      type: 'selected'
    })
    await sleep(500)
    setSelected({
      index: resultArrayIndex - 1,
      array: 'resultArray',
      payload: true,
      type: 'indexSelected'
    })
    await sleep(1000)
    setSelected({
      index: initialArrayIndex,
      array: 'initialArray',
      payload: false,
      type: 'selected'
    })
    setSelected({
      index: countingArrayIndex,
      array: 'countingArray',
      payload: false,
      type: 'indexSelected'
    })
    await sleep(500)
    const initialLastIndex = initialArr.lastIndexOf(initialArray[initialArrayIndex])
    initialArr[initialLastIndex] = 999
    moveContainer({
      index: initialLastIndex,
      containerRef: atom.resultArray[resultArrayIndex - 1].ref
    })
    setValueInCountingArray({
      index: countingArrayIndex,
      payload: resultArrayIndex - 1
    })
    blink({ index: countingArrayIndex, array: 'countingArray', type: 'selected' })
    setNumberOfElementsInCountingArray({
      index: countingArrayIndex,
      payload: elements
    })
    await sleep(1000)
    setSelected({
      index: countingArrayIndex,
      array: 'countingArray',
      payload: false,
      type: 'selected'
    })
    setSelected({
      index: resultArrayIndex - 1,
      array: 'resultArray',
      payload: false,
      type: 'indexSelected'
    })
  }

  const steps = useCallback(async function* steps() {
    const initialArr = [...initialArray]
    const countingArr = [...countingArray]
    const elementsInCountingArr = [...countingArray]

    let index = 0
    for (const value of initialArr) {
      setDisabled(true)
      moveElement(index++, value, ++countingArr[value], countingArr[value], 'countingArray')
      elementsInCountingArr[value]++
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

    const initialArrCopy = [...initialArr]
    for (let i = 0; i < initialArr.length; ++i) {
      setDisabled(true)
      await setNewPosition(
        i,
        initialArr[i],
        countingArr[initialArr[i]]--,
        --elementsInCountingArr[initialArr[i]],
        initialArrCopy
      )
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
            <ResultArray state={atom.resultArray} />
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
