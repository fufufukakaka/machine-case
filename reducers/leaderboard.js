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
    subTargetList:[],
    mainTargetList:[],
    focusTarget: null
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
    subTargetList:payload.subTargetList,
    mainTargetList:payload.mainTargetList,
    focusTarget : payload.focusTarget
  }),
  [fetchInitRequest]: state => Object.assign({}, state, {
    isFetching: true,
    isComplete: true
  }),
  [displayInitRequest]: (state,payload) => Object.assign({}, state, {
    isFetching: false,
    isComplete: false,
    data: payload.data,
    subTargetList:payload.subTargetList,
    mainTargetList:payload.mainTargetList,
    focusTarget : payload.focusTarget
  })
}, initial.leaderboard)

export default leaderboard
