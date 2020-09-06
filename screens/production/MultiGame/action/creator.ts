import { SocketClientMessageTypes } from "./types";

type EnterParam = {
  userId: number
}

const enter = (param: EnterParam) => ({
  type: SocketClientMessageTypes.ENTER,
  payload: param
})

type DockParam = {
  userId: number, roomId: number, stackIndex: number, action: 'DOCK' | 'UNDOCK'
}

const dock = (param: DockParam) => ({
  type: SocketClientMessageTypes.DOCK,
  payload: param
})

type AlertLoadedParam = {
  userId: number, roomId: number
}

const alertLoaded = (param: AlertLoadedParam) => ({
  type: SocketClientMessageTypes.LOADED,
  payload: param
})

type UpdateScoreParam = {
  roomId: number, userId: number, score: number
}

const updateScore = (param: UpdateScoreParam) => ({
  type: SocketClientMessageTypes.UPDATE_SCORE,
  payload: param
})

type AlertDisconnectParam = {
  roomId: number, userId: number,
}

const alertDisconnect = (param: AlertDisconnectParam) => ({
  type: SocketClientMessageTypes.ALERT_DISCONNECT,
  payload: param
})

type SuccessParam = {
  roomId: number, userId: number,
}

const success = (param: SuccessParam) => ({
  type: SocketClientMessageTypes.SUCCESS,
  payload: param,
})

type ExitParam = {
  roomId: number, userId: number,
}

const exit = (param: ExitParam) => ({
  type: SocketClientMessageTypes.EXIT,
  payload: param,
})

type AlertReadyParam = {
  roomId: number, userId: number,
}

const alertReady = (param: AlertReadyParam) => ({
  type: SocketClientMessageTypes.ALERT_READY,
  payload: param,
})

export const socketClientActions = {
  enter,
  dock,
  alertLoaded,
  updateScore,
  alertDisconnect,
  success,
  exit,
  alertReady,
}

export default socketClientActions;