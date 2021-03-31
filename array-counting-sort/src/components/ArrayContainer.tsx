import React, {FC} from 'react'
import {animated, config, Spring} from "react-spring";
import {makeStyles, Theme} from "@material-ui/core";
import {useAtom} from "@reatom/react";
import {rootAtom} from "../model";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: 64,
        background: 'yellow'
    }
}))

interface Props {
    index: number
}

const ArrayContainer: FC<Props> = ({index}) => {

    const container = useAtom(rootAtom, state => state.containers[index], [index])

    const classes = useStyles()

    return (
        <Spring
            config={config.default}
            from={{height: 0}}
            to={{height: 64}}>
            {props => <animated.div ref={container.ref} className={classes.root} style={props}/>}
        </Spring>
    )
}

export default ArrayContainer