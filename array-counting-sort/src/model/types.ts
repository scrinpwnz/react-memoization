import {RefObject} from "react";

export interface IState {
    elements: IElement[]
    containers: IContainer[]
    initialArray: IArrayState
    countingArray: IArrayState
}

export interface IArrayState {
    data: number[]
    map: RefObject<HTMLDivElement>[]
    currentIndex?: number
}

export interface IElement {
    value: number
    previousPosition?: IPosition
    ref: RefObject<HTMLDivElement>
    container: RefObject<HTMLDivElement>
}

export interface IContainer {
    ref: RefObject<HTMLDivElement>
    container: RefObject<HTMLDivElement>
}

export interface IPosition {
    top: number
    left: number
}