import {ButtonBase, makeStyles, Paper, Theme, Typography} from "@material-ui/core";
import React, {FC} from 'react'
import {green} from "@material-ui/core/colors";
import cn from 'classnames'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
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
    value: number
    selected?: boolean
    onClick?: () => void
}

const Element: FC<Props> = ({value, selected, onClick}) => {
    const classes = useStyles()

    return (
        <Paper elevation={3} className={cn(classes.root, {[classes.selected]: selected})}>
            <ButtonBase onClick={onClick}
                        className={classes.buttonBase}>
                <Typography variant={'h4'}>{value}</Typography>
            </ButtonBase>
        </Paper>
    )
}

export default Element