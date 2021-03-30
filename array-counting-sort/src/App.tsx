import React, {useEffect, useState} from 'react';
import ArraySpots from "./components/ArraySpots";
import {Button, makeStyles, Theme} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {useAction, useAtom} from '@reatom/react'
import {moveElementAction, rootAtom} from "./model";
import ArrayElementPortal from "./components/ArrayElementPortal";
import _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'grid',
        height: '100vh',
        placeItems: 'center',
        background: green[200]
    }
}))


const App = () => {
    const classes = useStyles()
    const [refInit, setRefInit] = useState(0)

    const atom = useAtom(rootAtom)
    const moveElement = useAction(moveElementAction)

    const random = () => {
        const countingIndex = _.random(0, atom.countingArray.map.length - 1)
        const initialIndex = _.random(0, atom.initialArray.map.length - 1)
        const newRef = atom.countingArray.map[countingIndex]
        moveElement({
            index: initialIndex,
            newRef
        })
    }

    useEffect(() => {
        setRefInit(refInit + 1)
    }, [])

    const handleMove = () => {
        const newRef = atom.countingArray.map[5]
        moveElement({
            index: 3,
            newRef
        })
    }

    return (
        <div className={classes.root}>
            <Button onClick={random}>Move</Button>
            <ArraySpots state={atom.initialArray}/>
            <ArraySpots state={atom.countingArray}/>
            {atom.elementsMap.map((item, index) => (
                    <ArrayElementPortal key={index} value={atom.initialArray.data[index]} container={item.current}/>
                ))}
        </div>
    )
}

export default App;
