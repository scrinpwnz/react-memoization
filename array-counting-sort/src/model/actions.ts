import {declareAction} from "@reatom/core";
import {RefObject} from "react";

interface MoveElementPayload {
    index: number,
    newRef: RefObject<HTMLDivElement>
}

export const moveElementAction = declareAction<MoveElementPayload>('MOVE_ELEMENT')