import {makeStyles, Theme} from "@material-ui/core";
import React, {FC, useEffect, useMemo, useState} from 'react'
import {IArray} from "../model";
import {animated, config, Spring} from "react-spring";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        height: 64,
        gap: theme.spacing(.5)
    },
    spot: {
        position: 'relative',
        display: 'grid',
        gridTemplateRows: 'repeat(auto-fill, 64px)',
        width: 64,
        height: 64,
        gridGap: 4,
        padding: 4,
        background: 'crimson'
    }
}))

interface Props {
    state: IArray
}

const CountingArray: FC<Props> = ({state}) => {

    const classes = useStyles()

    const prevData = useMemo<number[]>(() => [], [])

    return (
        <div className={classes.root}>
            {state.map.map((item, index) => {
                return (
                    <Spring
                        config={config.wobbly}
                        onResolve={() => prevData[index] = state.data[index]}
                        from={{height: prevData[index] ?? 0}}
                        to={{height: (state.data[index]) * 64 + ((state.data[index] > 1) ? (state.data[index] - 1) * 4 : 0)}}>
                        {props => <animated.div key={index} ref={item} className={classes.spot} style={props}/>}
                    </Spring>
                )
            })}
        </div>
    )
}

export default CountingArray