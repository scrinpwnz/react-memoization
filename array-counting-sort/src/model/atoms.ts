import {declareAtom} from "@reatom/core";
import {moveElementAction} from "./actions";
import {createRefMap} from "./utils";

const initialArray = [3, 2, 5, 7, 8, 2]

const initialState: State = {
    elementsMap: createRefMap(6),
    initialArray: {
        data: [3, 2, 5, 7, 8, 2],
        map: createRefMap(6),
        currentIndex: 0
    },
    countingArray: {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        map: createRefMap(10),
        currentIndex: 0
    }
}

const atom = declareAtom(
    'atom',
    on => [
        on(moveElementAction, state => {
            return state
        })
    ])