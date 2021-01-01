import { SupportedSkin } from "@components/Block/skinMap";
import { SupportedExpression } from "@components/Profile/Expressions";
import { SocketClientMessageTypes } from "@hooks/useMultiGameSocket/ClientMessage";

type BasicParam = {
  userId: number;
  roomId: number;
}

type EnterParam = {
  userId: number;
  name: string;
  skin: SupportedSkin;
}

export const enter = (param: EnterParam) => JSON.stringify({
  type: SocketClientMessageTypes.ENTER,
  payload: param
})

type DockParam = {
  userId: number, roomId: number, stackIndex: number, action: 'DOCK' | 'UNDOCK'
}

export const dock = (param: DockParam) => JSON.stringify({
  type: SocketClientMessageTypes.DOCK,
  payload: param
})

export const alertLoaded = (param: BasicParam) => JSON.stringify({
  type: SocketClientMessageTypes.LOADED,
  payload: param
})

type UpdateScoreParam = {
  roomId: number, userId: number, score: number
}

export const updateScore = (param: UpdateScoreParam) => JSON.stringify({
  type: SocketClientMessageTypes.UPDATE_SCORE,
  payload: param
})

export const alertDisconnect = (param: BasicParam) => JSON.stringify({
  type: SocketClientMessageTypes.ALERT_DISCONNECT,
  payload: param
})

export const success = (param: BasicParam) => JSON.stringify({
  type: SocketClientMessageTypes.SUCCESS,
  payload: param,
})

export const exit = (param: BasicParam) => JSON.stringify({
  type: SocketClientMessageTypes.EXIT,
  payload: param,
})

export const alertReady = (param: BasicParam) => JSON.stringify({
  type: SocketClientMessageTypes.ALERT_READY,
  payload: param,
})

export const alertPrepared = (param: BasicParam) => JSON.stringify({
  type: SocketClientMessageTypes.ALERT_PREPARED,
  payload: param,
})

export const requestRematch = (param: BasicParam) => JSON.stringify({
  type: SocketClientMessageTypes.REQUEST_REMATCH,
  payload: param,
})

export const requestOtherMatch = (param: BasicParam) => JSON.stringify({
  type: SocketClientMessageTypes.REQUEST_OTHERMATCH,
  payload: param,
})

export const cancelRequestRematch = (param: BasicParam) => JSON.stringify({
  type: SocketClientMessageTypes.CANCEL_REQUEST_REMATCH,
  payload: param,
})

export const declineRequestRematch = (param: BasicParam) => JSON.stringify({
  type: SocketClientMessageTypes.DECLINE_REQUEST_REMATCH,
  payload: param,
})

export const acceptRematch = (param: BasicParam) => JSON.stringify({
  type: SocketClientMessageTypes.ACCEPT_REMATCH,
  payload: param,
})

export const cancelRequestOtherMatch = (param: BasicParam) => JSON.stringify({
  type: SocketClientMessageTypes.CANCEL_REQUEST_REMATCH,
  payload: param,
})

export const informReceivedMap = (param: BasicParam) => JSON.stringify({
  type: SocketClientMessageTypes.INFORM_RECEIVED_MAP,
  payload: param,
})

export const expressEmotion = (param: BasicParam & {expression: SupportedExpression}) => JSON.stringify({
  type: SocketClientMessageTypes.EXPRESS_EMOTION,
  payload: param,
})

export const pong = (param: BasicParam) => JSON.stringify({
  type: SocketClientMessageTypes.PONG,
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
  requestRematch,
  acceptRematch,
  informReceivedMap,
  requestOtherMatch,
  cancelRequestRematch,
  cancelRequestOtherMatch,
  expressEmotion,
  pong,
}

export default socketClientActions;