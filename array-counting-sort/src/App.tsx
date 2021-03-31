import React, {RefObject, useEffect, useState} from 'react';
import ArraySpots from "./components/ArraySpots";
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

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'grid',
        height: '100vh',
        placeItems: 'center',
        background: green[200]
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
        container: containers[3]
    })
    updateCountInCountingArray({
        index: 3,
        payload: 1
    })
    yield
    moveContainer({
        index: 4,
        container: containers[3]
    })
    updateCountInCountingArray({
        index: 3,
        payload: 2
    })
    yield
    moveContainer({
        index: 5,
        container: containers[5]
    })
    updateCountInCountingArray({
        index: 5,
        payload: 1
    })
}


const App = () => {
    const classes = useStyles()
    const forceUpdate = useForceUpdate()
    const [updateCount, setUpdateCount] = useState(0)

    const atom = useAtom(rootAtom)
    const moveElement = useAction(moveElementAction)
    const moveContainer = useAction(moveContainerAction)
    const updateCountInCountingArray = useAction(updateCountInCountingArrayAction)

    const [generator, setGenerator] = useState<Generator<undefined, void>>(steps(moveContainer, updateCountInCountingArray, atom.countingArray.map))

    const random = () => {
        const countingIndex = _.random(0, atom.countingArray.map.length - 1)
        const initialIndex = _.random(0, atom.initialArray.map.length - 1)
        const container = atom.countingArray.map[countingIndex]
        moveContainer({
            index: initialIndex,
            container
        })
    }



    useEffect(() => {
        if (updateCount < 2) {
            forceUpdate()
            setUpdateCount(updateCount + 1)
        }
    }, [updateCount])

    return (
        <div className={classes.root}>
            <Button onClick={() => generator.next()}>Move</Button>
            <ArraySpots state={atom.initialArray}/>
            <ArraySpots state={atom.countingArray}/>
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
