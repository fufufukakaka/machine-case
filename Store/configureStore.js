import { createStore, applyMiddleware, combineReducers } from "redux"
import createSagaMiddleware from "redux-saga"
import { createLogger } from "redux-logger"
import {reducer as formReducer} from "redux-form"

export default function configureStore(initialState) {
  const logger = createLogger({})
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    combineReducers({
      form: formReducer
    }),
    initialState,
    applyMiddleware(
    logger
    )
  )
  return store
}
