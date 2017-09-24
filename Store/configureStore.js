import { createStore, applyMiddleware, combineReducers } from "redux"
import createSagaMiddleware from "redux-saga"
import { createLogger } from "redux-logger"
import {reducer as formReducer} from "redux-form"
import rootSaga from "../sagas"
import leaderboard from "../reducers/leaderboard"

export default function configureStore(initialState) {
  const logger = createLogger({})
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    combineReducers({
      leaderboard
    }),
    initialState,
    applyMiddleware(
    sagaMiddleware, logger
    )
  )
  sagaMiddleware.run(rootSaga)
  return store
}
