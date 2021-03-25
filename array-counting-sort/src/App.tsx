import React from 'react';
import InitialArray from "./components/InitialArray";
import {makeStyles, Theme} from "@material-ui/core";
import {green} from "@material-ui/core/colors";

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

    return (
        <div className={classes.root}>
            <InitialArray length={6}/>
        </div>
    );
}

export default App;
