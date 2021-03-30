import {RefObject} from "react";

export interface State {
    elementsMap: RefObject<HTMLDivElement>[]
    initialArray: ArrayState
    countingArray: ArrayState
}

export interface ArrayState {
    data: number[]
    map: RefObject<HTMLDivElement>[]
    currentIndex: number
}
