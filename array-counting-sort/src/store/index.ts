import {createStore} from "@reatom/core";
import {rootAtom} from "../model";
import { connectReduxDevtools } from '@reatom/debug'


export const store = createStore(rootAtom)
connectReduxDevtools(store)
