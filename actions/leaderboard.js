import { createAction } from "redux-act"
import "babel-polyfill"

export const fetchInitRequest = createAction("fetch Init Request")
export const displayInitRequest = createAction("display Init Request")
export const fetchRequest = createAction("fetch Request")
export const displayRequest = createAction("display Request")
export const changeSub = createAction("change Sub Target")
export const changeMain = createAction("change Main Target")
export const fetchConfusionMatrix = createAction("fetch Confusion Matrix")
export const displayConfusionMatrix = createAction("display Confusion Matrix")
export const sendDelete = createAction("send Delete")
export const completeDelete = createAction("complete Delete")
