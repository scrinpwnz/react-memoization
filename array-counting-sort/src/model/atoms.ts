import {declareAtom} from "@reatom/core";
import {
    moveContainerAction,
    moveElementAction,
    setElementPreviousPositionAction,
    updateCountInCountingArrayAction
} from "./actions";
import {createRefMap} from "./utils";
import {IState} from "./types";
import {createRef} from "react";

const initialArray = [3, 2, 5, 7, 8, 2]
const initialArrayMap = createRefMap(6)

const initialState: IState = {
    elements: initialArray.map((item, index) => ({
        value: item,
        previousPosition: undefined,
        ref: createRef<HTMLDivElement>(),
        container: initialArrayMap[index]
    })),
    containers: initialArray.map((item, index) => ({
        ref: createRef<HTMLDivElement>(),
        container: initialArrayMap[index]
    })),
    initialArray: {
        data: initialArray,
        map: initialArrayMap,
        currentIndex: undefined
    },
    countingArray: {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        map: createRefMap(10),
        currentIndex: undefined
    }
}

export const rootAtom = declareAtom(
    'rootAtom',
    initialState,
    on => [
        on(moveElementAction, (state, {index, container}) => {
            state.elements[index] = {
                ...state.elements[index],
                container
            }
            return {...state}
        }),
        on(moveContainerAction, (state, {index, container}) => {
            state.containers[index] = {
                ...state.containers[index],
                container
            }
            return {...state}
        }),
        on(setElementPreviousPositionAction, (state, {index, previousPosition}) => {
            state.elements[index].previousPosition = previousPosition
            return state
        }),
        on(updateCountInCountingArrayAction, (state, {index, payload}) => {
            const newData = state.countingArray.data
            newData[index] = payload
            return {
                ...state,
                countingArray: {
                    ...state.countingArray,
                    data: newData
                }
            }
        })
    ])