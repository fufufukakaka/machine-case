import { createReducer } from "redux-act"
import {
  fetchRequest,
  displayRequest,
  fetchInitRequest,
  displayInitRequest
} from "../actions/leaderboard"

const initial = {
  leaderboard: {
    isFetching: false,
    isComplete:false,
    data: {},
    focus_target: null
  }
}

const leaderboard = createReducer({
  [fetchRequest]: state => Object.assign({}, state, {
    isFetching: true,
    isComplete: true
  }),
  [displayRequest]: (state,payload) => Object.assign({}, state, {
    isFetching: false,
    isComplete: false,
    data: payload.data,
    focus_target : payload.focus_target
  }),
  [fetchInitRequest]: state => Object.assign({}, state, {
    isFetching: true,
    isComplete: true
  }),
  [displayInitRequest]: (state,payload) => Object.assign({}, state, {
    isFetching: false,
    isComplete: false,
    data: payload.data,
    focus_target : payload.focus_target
  })
}, initial.leaderboard)

export default leaderboard
