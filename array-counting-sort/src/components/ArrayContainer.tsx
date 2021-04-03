import React, {FC, useEffect} from 'react'
import {makeStyles, Theme} from "@material-ui/core";
import {useAction, useAtom} from "@reatom/react";
import {rerenderElementAction, rootAtom} from "../model";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: 64,
    }
}))

interface Props {
    index: number
}

const ArrayContainer: FC<Props> = ({index}) => {

    const container = useAtom(rootAtom, state => state.containers[index], [index])
    const rerenderElement = useAction(rerenderElementAction)

    const classes = useStyles()

    useEffect(() => {
        console.log(`'Контейнер ${index} родился!`)
        rerenderElement(index)
    }, [])

    return (
        <div ref={container.ref} className={classes.root}/>
    )
}

export default ArrayContainer