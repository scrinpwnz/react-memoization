import {declareAction} from "@reatom/core";
import {RefObject} from "react";
import {IPosition} from "./types";

export interface MoveElementPayload {
    index: number,
    container: RefObject<HTMLDivElement>
}

export const moveElementAction = declareAction<MoveElementPayload>('MOVE_ELEMENT')

export interface MoveContainerPayload {
    index: number,
    container: RefObject<HTMLDivElement>
}

export const moveContainerAction = declareAction<MoveContainerPayload>('MOVE_CONTAINER')

export interface SetElementPositionPayload {
    index: number
    position: IPosition
}

export const setElementPositionAction = declareAction<SetElementPositionPayload>("SET_ELEMENT_POSITION")

export interface UpdateCountInCountingArrayPayload {
    index: number
    payload: number
}

export const updateCountInCountingArrayAction = declareAction<UpdateCountInCountingArrayPayload>("UPDATE_COUNT_IN_COUNTING_ARRAY")

export const rerenderElementAction = declareAction<number>("RERENDER_ELEMENT")