import {declareAtom} from "@reatom/core";
import {moveElementAction} from "./actions";
import {createRefMap} from "./utils";
import {State} from "./types";

const initialArrayMap = createRefMap(6)

const initialState: State = {
    elementsMap: [...initialArrayMap],
    initialArray: {
        data: [3, 2, 5, 7, 8, 2],
        map: initialArrayMap,
        currentIndex: 0
    },
    countingArray: {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        map: createRefMap(10),
        currentIndex: 0
    }
}

export const rootAtom = declareAtom(
    'rootAtom',
    initialState,
    on => [
        on(moveElementAction, (state, {index, newRef}) => {
            debugger
            const newElementsMap = [...state.elementsMap]
            newElementsMap[index] = newRef
            return {
                ...state,
                elementsMap: newElementsMap
            }
        })
    ])