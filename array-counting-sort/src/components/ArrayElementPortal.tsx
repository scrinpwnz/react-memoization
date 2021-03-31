import React, {FC, memo, useEffect, useMemo, useState} from 'react'
import {createPortal} from "react-dom";
import ArrayElement from "./ArrayElement";
import {useForceUpdate} from "../hooks";

interface Props {
    index: number
    container: Element | null
}

const ArrayElementPortal: FC<Props> = memo(({index, container}) => {

    console.log('[ArrayElementPortal]',{container})

    const forceUpdate = useForceUpdate()

    useEffect(() => {
        forceUpdate()
    }, [])

    if (!container) return null

    return createPortal(<ArrayElement index={index}/>, container)
})

export default ArrayElementPortal