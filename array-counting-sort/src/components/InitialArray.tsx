import {makeStyles, Theme} from "@material-ui/core";
import React, {FC} from 'react'
import {IArray} from "../model";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        height: 64,
        gap: theme.spacing(.5)
    },
    spot: {
        position: 'relative',
        width: 64,
        height: 64,
        padding: 4,
        background: 'crimson'
    }
}))

interface Props {
    state: IArray
}

const InitialArray: FC<Props> = ({state}) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            {state.map.map((item, index) => (
                <div key={index} className={classes.spot} ref={item}/>
            ))}
        </div>
    )
}

export default InitialArray