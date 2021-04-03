import React, {RefObject, useEffect, useMemo, useState} from 'react';
import InitialArray from "./components/InitialArray";
import {Button, makeStyles, Theme} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {useAction, useAtom} from '@reatom/react'
import {
    moveContainerAction,
    MoveContainerPayload,
    moveElementAction,
    rootAtom,
    updateCountInCountingArrayAction, UpdateCountInCountingArrayPayload
} from "./model";
import ArrayElementPortal from "./components/ArrayElementPortal";
import _ from 'lodash'
import {useForceUpdate} from "./hooks";
import ArrayContainerPortal from "./components/ArrayContainerPortal";
import CountingArray from "./components/CountingArray";
import cn from 'classnames'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'grid',
        height: '100vh',
        placeItems: 'center',
        gridTemplateRows: 'repeat(3, 150px)',
        background: green[200]
    },
    hidden: {
        opacity: 0
    }
}))

function* steps(
    moveContainer: (payload: MoveContainerPayload) => void,
    updateCountInCountingArray: (payload: UpdateCountInCountingArrayPayload) => void,
    containers: RefObject<HTMLDivElement>[]
) {
    moveContainer({
        index: 0,
        container: containers[0]
    })
    updateCountInCountingArray({
        index: 0,
        payload: 1
    })
    yield
    moveContainer({
        index: 1,
        container: containers[0]
    })
    updateCountInCountingArray({
        index: 0,
        payload: 2
    })
    yield
    moveContainer({
        index: 2,
        container: containers[0]
    })
    updateCountInCountingArray({
        index: 0,
        payload: 3
    })
    yield
    moveContainer({
        index: 3,
        container: containers[0]
    })
    updateCountInCountingArray({
        index: 0,
        payload: 4
    })
    yield
    moveContainer({
        index: 4,
        container: containers[0]
    })
    updateCountInCountingArray({
        index: 0,
        payload: 5
    })
    yield
    moveContainer({
        index: 5,
        container: containers[0]
    })
    updateCountInCountingArray({
        index: 0,
        payload: 6
    })
    yield
    moveContainer({
        index: 5,
        container: containers[0]
    })
    updateCountInCountingArray({
        index: 0,
        payload: 6
    })
    moveContainer({
        index: 5,
        container: containers[9]
    })
    updateCountInCountingArray({
        index: 0,
        payload: 5
    })
    updateCountInCountingArray({
        index: 9,
        payload: 1
    })
    yield
    moveContainer({
        index: 0,
        container: containers[9]
    })
    updateCountInCountingArray({
        index: 9,
        payload: 2
    })
    updateCountInCountingArray({
        index: 0,
        payload: 4
    })
}


const App = () => {
    const classes = useStyles()
    const forceUpdate = useForceUpdate()
    const [updateCount, setUpdateCount] = useState(0)
    const [ready, setReady] = useState(false)

    console.count('App')

    const atom = useAtom(rootAtom)
    const moveElement = useAction(moveElementAction)
    const moveContainer = useAction(moveContainerAction)
    const updateCountInCountingArray = useAction(updateCountInCountingArrayAction)

    const generator = useMemo(() => steps(moveContainer, updateCountInCountingArray, atom.countingArray.map), [])

    useEffect(() => {
        if (updateCount < 2) {
            forceUpdate()
            setUpdateCount(updateCount + 1)
        } else {
            setReady(true)
        }
    }, [updateCount])

    return (
        <div className={cn(classes.root, {[classes.hidden]: !ready})}>
            <Button onClick={() => generator.next()}>Move</Button>
            <InitialArray state={atom.initialArray}/>
            <CountingArray state={atom.countingArray}/>
            {atom.containers.map((item, index) => (
                <ArrayContainerPortal key={index}
                                      index={index}
                                      container={item.container.current}/>
            ))}
            {atom.containers.map((item, index) => (
                <ArrayElementPortal key={index}
                                    index={index}
                                    container={item.ref.current}/>
            ))}
        </div>
    )
}

export default App;
