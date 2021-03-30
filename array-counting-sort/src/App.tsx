import React, {createRef, useEffect, useMemo, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import ArraySpots from "./components/ArraySpots";
import {makeStyles, Theme} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import MyElement from "./components/ArrayElement";
import ArrayElement from "./components/ArrayElement";

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
