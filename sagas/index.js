import { fork } from "redux-saga/effects"
import * as leaderboard from "./leaderboard"

export default function* rootSaga() {
  yield fork(request.handleFetchRequest)
  yield fork(request.handleFetchInitRequest)
}
