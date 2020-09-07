import { SocketClientMessageTypes } from "../../../../hooks/useMultiGameSocket/ClientMessage";

type BasicParam = {
  userId: number;
  roomId: number;
}

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

const alertLoaded = (param: BasicParam) => ({
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

const alertDisconnect = (param: BasicParam) => ({
  type: SocketClientMessageTypes.ALERT_DISCONNECT,
  payload: param
})

const success = (param: BasicParam) => ({
  type: SocketClientMessageTypes.SUCCESS,
  payload: param,
})

const exit = (param: BasicParam) => ({
  type: SocketClientMessageTypes.EXIT,
  payload: param,
})

const alertReady = (param: BasicParam) => ({
  type: SocketClientMessageTypes.ALERT_READY,
  payload: param,
})

const alertPrepared = (param: BasicParam) => ({
  type: SocketClientMessageTypes.ALERT_PREPARED,
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
  alertPrepared,
}

export default socketClientActions;