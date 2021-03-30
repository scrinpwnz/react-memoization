import React, {FC, useEffect, useMemo, useState} from 'react'
import {createPortal} from "react-dom";
import ArrayElement from "./ArrayElement";

interface Props {
    value: number
    container: Element | null
}

const ArrayElementPortal: FC<Props> = ({value, container}) => {

    const [previousContainer, setPreviousContainer] = useState<Element | null>(container)

    useEffect(() => {
        if (container) {
            setPreviousContainer(container)
        }
    }, [container])

    let left = 0
    let top = 0

    if (container) {
        const rect = container.getBoundingClientRect()
        const prevRect = previousContainer?.getBoundingClientRect()
        left = prevRect ? prevRect.left - rect.left : 0
        top = prevRect ? prevRect.top - rect.top : 0
    }

    const element = useMemo(() => {
        return <ArrayElement value={value} position={{top, left}}/>
    }, [top, left, value])


    if (!container) return null

    return createPortal(element, container)
}

export default ArrayElementPortal