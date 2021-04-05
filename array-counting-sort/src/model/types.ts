import {RefObject} from "react";

export interface IState {
    elements: IElement[]
    containers: IContainer[]
    initialArray: IInitialArray[]
    countingArray: ICountingArray[]
}

export interface IElement {
    value: number
    position?: IPosition
    ref: RefObject<HTMLDivElement>
    containerRef: RefObject<HTMLDivElement>
}

export interface IContainer {
    ref: RefObject<HTMLDivElement>
    containerRef: RefObject<HTMLDivElement>
}

export interface IInitialArray {
    value: number
    ref: RefObject<HTMLDivElement>
}

export interface ICountingArray {
    value: number
    selected: boolean
    numberOfElements: number
    ref: RefObject<HTMLDivElement>
}

export interface IPosition {
    top: number
    left: number
}