import { declareAtom } from '@reatom/core'
import {
  moveContainerAction,
  rerenderElementAction,
  setElementPositionAction,
  setNumberOfElementsInCountingArrayAction,
  setSelectedAction,
  setValueInCountingArrayAction
} from './actions'
import { createRefMap } from './utils'
import { IState } from './types'
import { random } from 'lodash'

export const initialArray = Array.from({ length: 15 }).map(_ => random(0, 9))
export const countingArray = Array.from({ length: 10 }).map(_ => 0)

const refs = {
  elements: createRefMap(initialArray.length),
  containers: createRefMap(initialArray.length),
  initialArray: createRefMap(initialArray.length),
  countingArray: createRefMap(10),
  resultArray: createRefMap(initialArray.length)
}

const initialState: IState = {
  elements: initialArray.map((item, index) => ({
    value: item,
    position: undefined,
    ref: refs.elements[index],
    containerRef: refs.containers[index]
  })),
  containers: initialArray.map((item, index) => ({
    ref: refs.containers[index],
    containerRef: refs.initialArray[index]
  })),
  initialArray: initialArray.map((item, index) => ({
    value: item,
    selected: false,
    indexSelected: false,
    ref: refs.initialArray[index]
  })),
  countingArray: countingArray.map((item, index) => ({
    value: item,
    selected: false,
    indexSelected: false,
    numberOfElements: 0,
    ref: refs.countingArray[index]
  })),
  resultArray: initialArray.map((item, index) => ({
    value: index + 1,
    selected: false,
    indexSelected: false,
    ref: refs.resultArray[index]
  }))
}

export const rootAtom = declareAtom('rootAtom', initialState, on => [
  on(moveContainerAction, (state, { index, containerRef }) => {
    state.containers[index] = {
      ...state.containers[index],
      containerRef
    }
    return { ...state }
  }),
  on(setElementPositionAction, (state, { index, position }) => {
    state.elements[index].position = position
    return state
  }),
  on(setValueInCountingArrayAction, (state, { index, payload }) => {
    state.countingArray[index] = {
      ...state.countingArray[index],
      value: payload
    }
    return { ...state }
  }),
  on(setNumberOfElementsInCountingArrayAction, (state, { index, payload }) => {
    state.countingArray[index] = {
      ...state.countingArray[index],
      numberOfElements: payload
    }
    return { ...state }
  }),
  on(rerenderElementAction, (state, index) => {
    return { ...state }
  }),
  on(setSelectedAction, (state, { index, payload, array, type }) => {
    state[array][index] = {
      ...state[array][index],
      [type]: payload
    }
    return { ...state }
  })
])
