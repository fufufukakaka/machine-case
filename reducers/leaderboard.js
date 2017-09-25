import { createReducer } from "redux-act"
import {
  fetchRequest,
  displayRequest,
  fetchInitRequest,
  displayInitRequest,
  changeSub,
  changeMain,
  fetchConfusionMatrix,
  displayConfusionMatrix
} from "../actions/leaderboard"

const initial = {
  leaderboard: {
    isFetching: false,
    isComplete:false,
    data: {},
    subTargetList:[],
    mainTargetList:[],
    focusTarget: null,
    focusSubTarget: null,
    class_array: [],
    value_array:[]
  }
}

const leaderboard = createReducer({
  [fetchRequest]: state => Object.assign({}, state, {
    isFetching: true,
    isComplete: false
  }),
  [displayRequest]: (state,payload) => Object.assign({}, state, {
    isFetching: false,
    isComplete: true,
    data: payload.data,
    subTargetList:payload.subTargetList,
    focusTarget : payload.focusTarget,
    focusSubTarget : payload.subTargetList[0]
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
    focusTarget : payload.focusTarget,
    focusSubTarget : payload.subTargetList[0]
  }),
  [changeSub]: (state,payload) => Object.assign({}, state, {
    focusSubTarget: payload
  }),
  [changeMain]: (state,payload) => Object.assign({}, state, {
    focusTarget: payload,
    isFetching: true,
    isComplete: false
  }),
  [displayConfusionMatrix]: (state,payload) => Object.assign({}, state, {
    class_array: payload.class_array,
    value_array: payload.value_array
  })
}, initial.leaderboard)

export default leaderboard
