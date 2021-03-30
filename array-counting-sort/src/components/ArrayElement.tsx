import {ButtonBase, makeStyles, Paper, Theme, Typography} from "@material-ui/core";
import React, {FC} from 'react'
import {green} from "@material-ui/core/colors";
import cn from 'classnames'
import {animated, config, Spring} from "react-spring";

const useStyles = makeStyles((theme: Theme) => ({
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

interface Position {
    top: number,
    left: number
}

interface Props {
    value: number
    selected?: boolean
    onClick?: () => void
    position: Position
}

const ArrayElement: FC<Props> = ({value, selected, onClick, position}) => {
    const classes = useStyles()

    return (
        <Spring
            config={config.gentle}
            from={{transform: `translate(${position.left}px, ${position.top}px)`}}
            to={{transform: `translate(0px, 0px)`}}>
            {props => <animated.div style={props}>
                <Paper elevation={3}
                       className={cn(classes.paper, {[classes.selected]: selected})}>
                    <ButtonBase onClick={() => console.log(DOMRect)}
                                className={classes.buttonBase}>
                        <Typography variant={'h4'}>{value}</Typography>
                    </ButtonBase>
                </Paper>
            </animated.div>}
        </Spring>
    )
}

export default ArrayElement