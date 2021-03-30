import {Theme, makeStyles} from "@material-ui/core";
import React, {createRef, Dispatch, FC, RefObject, SetStateAction, useEffect, useState} from 'react'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        height: 64,
        background: 'wheat',
        gap: theme.spacing(.5)
    },
    spot: {
        width: 64,
        height: 64,
        background: 'crimson'
    }
}))

interface Props {
    length: number
    setTarget: Dispatch<SetStateAction<Element | undefined>>
}

const createRefMap = (length: number) => {
    return Array.from({length}).map(_ => createRef<HTMLDivElement>())
}

const ArraySpots: FC<Props> = ({length, setTarget}) => {

    const classes = useStyles()

    // const [selected, setSelected] = useState<boolean[]>([])
    const [refMap, setRefMap] = useState<Array<RefObject<HTMLDivElement>>>(createRefMap(length))

    useEffect(() => {
        setRefMap(createRefMap(length))
    }, [length])

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

    const handleSetTarget = (index: number) => () => {
        const target = refMap[index].current
        if (target) {
            setTarget(target)
        }
    }

    return (
        <div className={classes.root}>
            {refMap.map((item, index) => {
                return <div className={classes.spot} ref={item} onClick={handleSetTarget(index)}/>
            })}
        </div>
    )
}

export default ArraySpots