import {makeStyles, Theme} from "@material-ui/core";
import React, {FC} from 'react'
import {IArrayState} from "../model";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        height: 64,
        gap: theme.spacing(.5)
    },
    spot: {
        position: 'relative',
        transition: theme.transitions.create(['height'], {
            duration: 300,
            easing: 'ease'
        }),
        width: 64,
        height: 64,
        padding: 4,
        background: 'crimson'
    }
}))

interface Props {
    state: IArrayState
}

const ArraySpots: FC<Props> = ({state}) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            {state.map.map((item, index) => (
                <div key={index} style={{height: (state.data[index]) * 64}} className={classes.spot} ref={item}/>
            ))}
        </div>
    )
}

export default ArraySpots