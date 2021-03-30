import React, {FC, RefObject} from 'react'
import {createPortal} from "react-dom";
import ArrayElement from "./ArrayElement";

interface Props {
    value: number
    currentRef: RefObject<HTMLDivElement>
}

const ArrayElementPortal: FC<Props> = ({value, currentRef}) => {

    if (!currentRef.current) return null

    return createPortal(<ArrayElement value={value} position={{top: 0, left: 0}}/>, currentRef.current)
}

export default ArrayElementPortal