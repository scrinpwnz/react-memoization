import {declareAction} from "@reatom/core";
import {RefObject} from "react";

export const moveElementAction = declareAction<RefObject<HTMLDivElement>>('MOVE_ELEMENT')