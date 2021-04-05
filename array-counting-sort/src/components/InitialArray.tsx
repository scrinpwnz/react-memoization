import {makeStyles, Paper, Theme, Typography} from "@material-ui/core";
import React, {FC} from 'react'
import {IInitialArray} from "../model";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        gap: theme.spacing(.5),
        padding: theme.spacing(1),
        borderRadius: theme.spacing(3)
    },
    spot: {
        position: 'relative',
        width: 64,
        height: 64
    },
    placeholder: {
        position: 'absolute',
        width: 64,
        height: 64,
        top: 0,
        left: 0,
        display: 'grid',
        placeItems: 'center',
        zIndex: 0
    }
}))

interface Props {
    state: IInitialArray[]
}

const InitialArray: FC<Props> = ({state}) => {

    const classes = useStyles()

    return (
        <Paper elevation={6} className={classes.root}>
            {state.map((item, index) => (
                <div key={index} className={classes.spot} ref={item.ref}>
                    <div className={classes.placeholder}>
                        <Typography variant={'h4'} color={'textSecondary'}>{item.value}</Typography>
                    </div>
                </div>
            ))}
        </Paper>
    )
}

export default InitialArray