import React, {createRef, useEffect, useMemo, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import ArraySpots from "./components/ArraySpots";
import {Button, makeStyles, Theme} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import MyElement from "./components/ArrayElement";
import ArrayElement from "./components/ArrayElement";
import {context, useAction, useAtom} from '@reatom/react'
import {store} from "./store";
import {moveElementAction, rootAtom} from "./model";
import ArrayElementPortal from "./components/ArrayElementPortal";

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

    const atom = useAtom(rootAtom)
    const moveElement = useAction(moveElementAction)

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <ArraySpots state={atom.initialArray}/>
            <ArraySpots state={atom.countingArray}/>
            {atom.elementsMap.map((item, index) => (
                <ArrayElementPortal value={atom.initialArray.data[index]} currentRef={item}/>
                ))}
        </div>
    )
}

export default App;
