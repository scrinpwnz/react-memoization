import {RefObject} from "react";

export interface IState {
    elements: IElement[]
    containers: IContainer[]
    initialArray: IArray[]
    countingArray: IArray[]
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

export interface IArray {
    value: number
    ref: RefObject<HTMLDivElement>
}

export interface IPosition {
    top: number
    left: number
}