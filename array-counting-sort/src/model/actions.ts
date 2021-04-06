import { declareAction } from '@reatom/core'
import { RefObject } from 'react'
import { IPosition } from './types'
import { sleep } from '../helpers'

export interface MoveContainerPayload {
  index: number
  containerRef: RefObject<HTMLDivElement>
}

export const moveContainerAction = declareAction<MoveContainerPayload>()

export interface SetElementPositionPayload {
  index: number
  position: IPosition
}

export const setElementPositionAction = declareAction<SetElementPositionPayload>()

export interface setValueInCountingArrayPayload {
  index: number
  payload: number
}

export const setValueInCountingArrayAction = declareAction<setValueInCountingArrayPayload>()

export interface setNumberOfElementsInCountingArrayPayload {
  index: number
  payload: number
}

export const setNumberOfElementsInCountingArrayAction = declareAction<setNumberOfElementsInCountingArrayPayload>()

export const rerenderElementAction = declareAction<number>()

export const setSelectedInCountingArrayAction = declareAction<{ index: number; payload: boolean }>()

export const blinkInCountingArrayReaction = declareAction<{ index: number; timeout?: number }>(
  'blinkInCountingArray',
  async ({ index, timeout = 300 }, { dispatch }) => {
    dispatch(setSelectedInCountingArrayAction({ index, payload: true }))
    await sleep(timeout)
    dispatch(setSelectedInCountingArrayAction({ index, payload: false }))
  }
)
