import { createAction } from "redux-act"
import "babel-polyfill"

export const fetchInitRequest = createAction("fetch Init Request")
export const displayInitRequest = createAction("display Init Request")
export const fetchRequest = createAction("fetch Request")
export const displayRequest = createAction("display Request")
export const changeSub = createAction("change Sub Target")
export const changeMain = createAction("change Main Target")
