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
    focus_submission_id: 1
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
    focus_submission_id : payload.focus_submission_id
  }),
  [fetchInitRequest]: state => Object.assign({}, state, {
    isFetching: true,
    isComplete: true
  }),
  [displayInitRequest]: (state,payload) => Object.assign({}, state, {
    isFetching: false,
    isComplete: false,
    data: payload.data
  })
}, initial.leaderboard)

export default leaderboard
