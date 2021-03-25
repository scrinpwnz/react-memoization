import {Theme, makeStyles} from "@material-ui/core";
import React, {createRef, FC, RefObject, useEffect, useState} from 'react'
import Element from "./Element";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        height: 62,
        background: 'wheat',
        gap: theme.spacing(.5)
    },
    spot: {
        width: 62,
        height: 62,
        background: 'crimson'
    }
}))

interface Props {
    length: number
}

const createRefMap = (length: number) => {
    return Array.from({length}).map(item => createRef<HTMLDivElement>())
}

const InitialArray: FC<Props> = ({length}) => {

    const classes = useStyles()

    // const [selected, setSelected] = useState<boolean[]>([])
    const [refMap, setRefMap] = useState<Array<RefObject<HTMLDivElement>>>(createRefMap(length))

    useEffect(() => {
        setRefMap(createRefMap(length))
    }, [length])

    // @ts-ignore
    window._refMap = refMap


    // const handleBlink = (index: number) => () => {
    //     setSelectedInElement(index, true)
    //     setTimeout(() => {
    //         setSelectedInElement(index, false)
    //     }, 300)
    // }
    //
    // const setSelectedInElement = (index: number, payload: boolean) => {
    //     setSelected((state) => {
    //         const newState = [...state]
    //         newState[index] = payload
    //         return newState
    //     })
    // }

    return (
        <div className={classes.root}>
            {refMap.map((item, index) => {
                return <div className={classes.spot} ref={item}/>
            })}
        </div>
    )
}

export default InitialArray