import React, {createRef, useEffect, useMemo, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import InitialArray from "./components/InitialArray";
import {makeStyles, Theme} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import MyElement from "./components/Element";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'grid',
        height: '100vh',
        placeItems: 'center',
        background: green[200]
    }
}))

const createRefMap = (length: number) => {
    return Array.from({length}).map(_ => createRef<HTMLDivElement>())
}


const App = () => {
    const classes = useStyles()

    const initialArray = {
        array: [3, 2, 5, 7, 8, 2],
        map: createRefMap(6)
    }

    const countingArray = {
        array: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        map: createRefMap(10)
    }

    const resultArray = {
        array: Array.from({length: 6}),
        map: createRefMap(6)
    }

    //
    // const [DOMRect, setDOMRect] = useState<DOMRect>()
    // const [target, setTarget] = useState<Element>()
    //
    // useEffect(() => {
    //     setDOMRect(target?.getBoundingClientRect())
    // }, [target])
    //
    // return (
    //     <div className={classes.root}>
    //         <InitialArray length={10} setTarget={setTarget}/>
    //         <InitialArray length={6} setTarget={setTarget}/>
    //         {target && ReactDOM.createPortal(
    //             <MyElement value={42} position={{
    //                 top: (DOMRect?.top ?? 0) - target.getBoundingClientRect().top,
    //                 left: (DOMRect?.left ?? 0) - target.getBoundingClientRect().left
    //             }}/>,
    //             target
    //         )}
    //     </div>
    // );

    return (
        <div className={classes.root}>

        </div>
    )
}

export default App;
