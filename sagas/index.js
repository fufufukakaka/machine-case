import { fork } from "redux-saga/effects"
import * as leaderboard from "./leaderboard"

export default function* rootSaga() {
  yield fork(leaderboard.handleFetchRequest)
  yield fork(leaderboard.handleFetchInitRequest)
  yield fork(leaderboard.handleFetchConfusionMatrix)
}
