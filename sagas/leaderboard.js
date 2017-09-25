import { take, put,call,select } from "redux-saga/effects"
import superFetch from "../modules/superFetch"
import {
  fetchRequest,
  displayRequest,
  fetchInitRequest,
  displayInitRequest,
  changeMain
} from "../actions/leaderboard"

export function* handleFetchInitRequest() {
  while (true) {
    const action = yield take([`${fetchInitRequest}`])
      const { payload} = yield call(superFetch, {
        url: "machine-case/getRecent",
        type: "GET"
    }
  )
    yield put(displayInitRequest(Object.assign({}, payload)))
    }
}

export function* handleFetchRequest() {
  while (true) {
    const action = yield take([`${changeMain}`])
      const { payload} = yield call(superFetch, {
        url: "machine-case/getTarget",
        type: "POST",
        data: action.payload
    }
  )
    yield put(displayRequest(Object.assign({}, payload)))
    }
}
