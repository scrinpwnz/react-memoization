import {ButtonBase, makeStyles, Paper, Theme, Typography} from "@material-ui/core";
import React, {FC, memo, useEffect, useMemo} from 'react'
import {green} from "@material-ui/core/colors";
import cn from 'classnames'
import {animated, config, Spring} from "react-spring";
import {useAction, useAtom} from "@reatom/react";
import {rootAtom, setElementPositionAction} from "../model";
import {useForceUpdate} from "../hooks";
import _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    paper: {
        height: 64,
        width: 64,
        display: 'grid',
        placeItems: 'center',
        color: green[900],
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(2),
        transition: theme.transitions.create(['background-color', 'color'], {
            duration: 300,
            easing: 'ease'
        })
    },
    selected: {
        backgroundColor: green[900],
        color: theme.palette.background.paper
    },
    buttonBase: {
        width: '100%',
        height: '100%'
    }
}))

interface Props {
    index: number
}

const ArrayElement: FC<Props> = ({index}) => {

    const classes = useStyles()

    const element = useAtom(rootAtom, state => state.elements[index], [index])
    const setElementPosition = useAction(setElementPositionAction)

    const rect = element.container.current?.getBoundingClientRect()

    const position = {
        top: rect?.top ?? 0,
        left: rect?.left ?? 0
    }

    useEffect(() => {
        console.log(`Элемент ${index} родился на позиции [${position.top}, ${position.left}]`)
        setElementPosition({
            index,
            position
        })
    }, [])

    const startPosition = {
        left: element.position ? element.position?.left - position.left : 0,
        top: element.position ? element.position?.top - position.top : 0,
    }

    return <Spring
            config={config.gentle}
            from={{transform: `translate(${startPosition.left}px, ${startPosition.top}px)`}}
            to={{transform: `translate(0px, 0px)`}}>
            {props => <animated.div style={props}>
                <Paper elevation={3}
                       ref={element.ref}
                       className={cn(classes.paper, {[classes.selected]: false})}>
                    <ButtonBase onClick={() => {}}
                                className={classes.buttonBase}>
                        <Typography variant={'h4'}>{element.value}</Typography>
                    </ButtonBase>
                </Paper>
            </animated.div>}
        </Spring>
}

export default ArrayElement