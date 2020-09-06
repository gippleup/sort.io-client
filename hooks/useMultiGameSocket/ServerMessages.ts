import { MapDesc } from "../routes/Model/GameRoom"

export enum SocketServerMessageTypes {
  SYNC_TIMER = 'SYNC_TIMER',
  SEND_ROOM = 'SEND_ROOM',
  ALERT_DOCK = 'ALERT_DOCK',
  DELETE_ROOM = 'DELETE_ROOM',
}

export type SyncTimerMessage = {
  type: SocketServerMessageTypes.SYNC_TIMER;
  payload: {
    leftTime: number;
  }
}

export type SendRoomMessage = {
  type: SocketServerMessageTypes.SEND_ROOM;
  payload: {
    map: number[][];
    mapDesc: MapDesc;
    roomId: number;
  }
}

export type AlertDockConstructor = {
  userId: number;
  stackIndex: number;
  action: 'DOCK' | 'UNDOCK';
}

export type AlertDockMessage = {
  type: SocketServerMessageTypes.ALERT_DOCK;
  payload: AlertDockConstructor;
}

export type DeleteRoom = {
  type: SocketServerMessageTypes.DELETE_ROOM;
  payload: {};
}

export type SocketServerMessages =
  SyncTimerMessage
  | SendRoomMessage
  | AlertDockMessage
  | DeleteRoom