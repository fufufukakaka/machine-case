import { take, put,call,select } from "redux-saga/effects"
import superFetch from "../modules/superFetch"
import {
  fetchRequest,
  displayRequest,
  fetchInitRequest,
  displayInitRequest,
  changeMain,
  fetchConfusionMatrix,
  displayConfusionMatrix,
  sendDelete,
  completeDelete
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

export function* handleFetchConfusionMatrix() {
  while (true) {
    const action = yield take([`${fetchConfusionMatrix}`])
      const { payload} = yield call(superFetch, {
        url: "machine-case/getConfusionMatrix",
        type: "POST",
        data: action.payload
    }
  )
    yield put(displayConfusionMatrix(Object.assign({}, payload)))
    }
}

export function* handleSendDelete() {
  while (true) {
    const action = yield take([`${sendDelete}`])
      const { payload} = yield call(superFetch, {
        url: "machine-case/delete/id",
        type: "POST",
        data: action.payload
    }
  )
    yield put(completeDelete(Object.assign({}, payload)))
    }
}
