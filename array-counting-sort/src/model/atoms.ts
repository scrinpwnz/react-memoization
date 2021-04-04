import {combine, declareAtom, map} from "@reatom/core";
import {
    moveContainerAction,
    moveElementAction, rerenderElementAction, setElementPositionAction,
    updateCountInCountingArrayAction
} from "./actions";
import {createRefMap} from "./utils";
import {IState} from "./types";
import {createRef} from "react";

const initialArray = [3, 2, 5, 7, 8, 2]
const countingArray = Array.from({length: 10}).map(_ => 0)

const refs = {
    elements: createRefMap(6),
    elementsContainers: createRefMap(6),
    initialArray: createRefMap(6),
    countingArray: createRefMap(10)
}

const initialState: IState = {
    elements: initialArray.map((item, index) => ({
        value: item,
        position: undefined,
        ref: refs.elements[index],
        containerRef: refs.elementsContainers[index]
    })),
    containers: initialArray.map((item, index) => ({
        ref: refs.elementsContainers[index],
        containerRef: refs.initialArray[index]
    })),
    initialArray: initialArray.map((item, index) => ({
        value: item,
        ref: refs.initialArray[index]
    })),
    countingArray: countingArray.map((item, index) => ({
        value: item,
        ref: refs.countingArray[index]
    }))
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
        on(setElementPositionAction, (state, {index, position}) => {
            state.elements[index].position = position
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
        }),
        on(rerenderElementAction, (state, index) => {
            return { ...state }
        })
    ])