import React from 'react';
import { configureSocket } from '../api/sortio';
import { SocketServerMessages, SocketServerMessageTypes as MessageType, AlertDockConstructor, SendRoomMessage } from './useMultiGameSocket/ServerMessages';
import { MapDesc } from '../screens/production/MutiGame';
import socketClientActions from "../hooks/useMultiGameSocket/action/creator";

export type OnSendRoomParam = SendRoomMessage["payload"];

type ListenerCallback = {
  onSendRoom: (option: OnSendRoomParam) => any;
  onInformOpponentHasLeft: (passedGoodTime: boolean) => any;
  onAlertDock: (dockInfo: AlertDockConstructor) => any;
  onSyncTimer: (leftTime: number) => any;
  onOpen: () => any;
  onError: (e: WebSocketErrorEvent) => any;
  onClose: (e: WebSocketCloseEvent) => any;
  onMessage: (e: WebSocketMessageEvent) => any;
  onDeleteRoom: () => any;
  onAlertPrepare: () => any;
  onSyncPrepareTimer: (leftTime: number) => any;
  onInformWinner: (winnerId: number) => any;
  onAskRematch: () => any;
  onCancelRematchAsk: () => any;
  onAlertRematchDeclined: () => any;
  onInformRematchAccepted: () => any;
  onInformPrepareRematch: () => any;
  onAllowInformRematchRequest: () => any;
  onSendExpressionData: (info: {userId: number, expression: string}) => any;
  onPing: () => any;
}

type ListenerManager = {
  [key in keyof ListenerCallback]: {
    [index: number]: ListenerCallback[key]
  }
}

export type MultiGameSocketListener = {
  key: keyof ListenerCallback;
  callbackId: number;
}

let socket: null | WebSocket = null;
let roomId: number = -1;
let map: null | number[][] = null;
let mapDesc: null | MapDesc = null;
let players: {
  id: number;
  name: string;
  photo: string;
  skin: string;
}[] = [];

const listenerManager: ListenerManager = {
  onSendRoom: {},
  onInformOpponentHasLeft: {},
  onAlertDock: {},
  onSyncTimer: {},
  onClose: {},
  onError: {},
  onMessage: {},
  onOpen: {},
  onDeleteRoom: {},
  onAlertPrepare: {},
  onSyncPrepareTimer: {},
  onInformWinner: {},
  onAskRematch: {},
  onCancelRematchAsk: {},
  onAlertRematchDeclined: {},
  onInformRematchAccepted: {},
  onInformPrepareRematch: {},
  onAllowInformRematchRequest: {},
  onSendExpressionData: {},
  onPing: {},
};

const forEachValue = (target: Object, cb: (value: any) => any) => {
  Object.values(target).forEach((value) => cb(value))
}

let socketId = 0;

type MultiGameSocketOption = {
  reconfigure: boolean;
}

const useMultiGameSocket = (option?: MultiGameSocketOption) => {
  const listenerCount = React.useRef(0);
  if (!socket) {
    socket = configureSocket();
    socketId += 1;
  } else if (option && option.reconfigure) {
    if (socket) socket.close();
    socket = configureSocket();
    socketId += 1;
  }

  const multiGameSocket = React.useRef({
    id: socketId,
    raw: socket,
    addListener: (key: keyof ListenerCallback, callback: ListenerCallback[typeof key]): MultiGameSocketListener => {
      const callbackId = listenerCount.current;
      listenerManager[key][callbackId] = callback;
      listenerCount.current += 1;
      return {key, callbackId};
    },
    removeListener: (listener: MultiGameSocketListener) => {
      delete listenerManager[listener.key][listener.callbackId]
    },
    send: (data: string | ArrayBuffer | ArrayBufferView | Blob): void => {
      if (socket) {
        socket.send(data);
      }
    },
    close: () => {
      if (socket) {
        forEachValue(listenerManager.onClose, (cb) => cb());
        players = [];
        roomId = -1;
        socket.close();
        socket = null;
      }
    },
    readyState: socket.readyState,
    getRoomId: () => roomId,
    getPlayers: () => players,
    getMap: () => map,
    getMapDesc: () => mapDesc,
    getRoomData: () => ({
      roomId,
      players,
      map,
      mapDesc,
    })
  }).current;

  socket.onopen = () => {
    forEachValue(listenerManager.onOpen, (cb) => cb());
  }

  socket.onerror = (e) => {
    forEachValue(listenerManager.onError, (cb) => cb(e));
  }

  socket.onmessage = (e) => {
    forEachValue(listenerManager.onMessage, (cb) => cb(e))
    const parsedData: SocketServerMessages = JSON.parse(e.data);
    if (parsedData.type === MessageType.SEND_ROOM) {
      const option = parsedData.payload;
      roomId = option.roomId;
      map = option.map;
      mapDesc = option.mapDesc;
      players = option.playerData;
      forEachValue(listenerManager.onSendRoom, (cb) => cb(option))
    } else if (parsedData.type === MessageType.INFORM_OPPONENT_HAS_LEFT) {
      forEachValue(listenerManager.onInformOpponentHasLeft, (cb) => cb(parsedData.payload))
    } else if (parsedData.type === MessageType.ALERT_DOCK) {
      const option = parsedData.payload;
      forEachValue(listenerManager.onAlertDock, (cb) => cb(option))
    } else if (parsedData.type === MessageType.SYNC_TIMER) {
      const { leftTime } = parsedData.payload;
      forEachValue(listenerManager.onSyncTimer, (cb) => cb(leftTime))
    } else if (parsedData.type === MessageType.DELETE_ROOM) {
      roomId = -1;
      players = [];
      map = null;
      mapDesc = null;
      forEachValue(listenerManager.onDeleteRoom, (cb) => cb())
    } else if (parsedData.type === MessageType.ALERT_PREPARE) {
      forEachValue(listenerManager.onAlertPrepare, (cb) => cb())
    } else if (parsedData.type === MessageType.SYNC_PREPARE_TIMER) {
      const { leftTime } = parsedData.payload
      forEachValue(listenerManager.onSyncPrepareTimer, (cb) => cb(leftTime))
    } else if (parsedData.type === MessageType.INFORM_WINNER) {
      const { winner } = parsedData.payload;
      forEachValue(listenerManager.onInformWinner, (cb) => cb(winner))
    } else if (parsedData.type === MessageType.ASK_REMATCH) {
      forEachValue(listenerManager.onAskRematch, (cb) => cb())
    } else if (parsedData.type === MessageType.CANCEL_REMATCH_ASK) {
      forEachValue(listenerManager.onCancelRematchAsk, (cb) => cb())
    } else if (parsedData.type === MessageType.ALERT_REMATCH_DECLINED) {
      forEachValue(listenerManager.onAlertRematchDeclined, (cb) => cb())
    } else if (parsedData.type === MessageType.INFORM_REMATCH_ACCEPTED) {
      forEachValue(listenerManager.onInformRematchAccepted, (cb) => cb())
    } else if (parsedData.type === MessageType.INFORM_PREPARE_REMATCH) {
      forEachValue(listenerManager.onInformPrepareRematch, (cb) => cb())
    } else if (parsedData.type === MessageType.ALLOW_INFORM_REMATCH_REQUEST) {
      forEachValue(listenerManager.onAllowInformRematchRequest, (cb) => cb())
    } else if (parsedData.type === MessageType.SEND_EXPRESSION_DATA) {
      const {expression, userId} = parsedData.payload;
      forEachValue(listenerManager.onSendExpressionData, (cb) => cb({userId, expression}))
    } else if (parsedData.type === MessageType.PING) {
      forEachValue(listenerManager.onPing, (cb) => cb())
    }
  }
  return multiGameSocket;
}

export default useMultiGameSocket;
