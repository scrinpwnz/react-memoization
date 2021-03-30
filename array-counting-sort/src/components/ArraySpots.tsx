import {makeStyles, Theme} from "@material-ui/core";
import React, {FC} from 'react'
import {ArrayState} from "../model";

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
    state: ArrayState
}

const ArraySpots: FC<Props> = ({state}) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            {state.map.map((item, index) => (
                <div key={index} className={classes.spot} ref={item}/>
            ))}
        </div>
    )
}

export default ArraySpots