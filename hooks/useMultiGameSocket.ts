import React from 'react';
import { configureSocket } from '../api/sortio';
import { SocketServerMessages, SocketServerMessageTypes as MessageType, AlertDockConstructor } from './useMultiGameSocket/ServerMessages';
import { MapDesc } from '../screens/production/MutiGame';

export type OnSendRoomParam = { map: number[][], mapDesc: MapDesc, roomId: number };

type ListenerCallback = {
  onSendRoom: (option: OnSendRoomParam) => any;
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
}

type ListenerManager = {
  [key in keyof ListenerCallback]: {
    [index: number]: ListenerCallback[key]
  }
}

type MultiGameSocketListener = {
  key: keyof ListenerCallback;
  callbackId: number;
}

let socket: null | WebSocket = null;

const listenerManager: ListenerManager = {
  onSendRoom: {},
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
};

const forEachValue = (target: Object, cb: (value: any) => any) => {
  Object.values(target).forEach((value) => cb(value))
}

const useMultiGameSocket = () => {
  const listenerCount = React.useRef(0);
  if (!socket) {
    socket = configureSocket();
  }

  const multiGameSocket = React.useRef({
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
        socket.close();
        socket = null;
      }
    },
    readyState: socket.readyState,
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
      forEachValue(listenerManager.onSendRoom, (cb) => cb(option))
    } else if (parsedData.type === MessageType.ALERT_DOCK) {
      const option = parsedData.payload;
      forEachValue(listenerManager.onAlertDock, (cb) => cb(option))
    } else if (parsedData.type === MessageType.SYNC_TIMER) {
      const { leftTime } = parsedData.payload;
      forEachValue(listenerManager.onSyncTimer, (cb) => cb(leftTime))
    } else if (parsedData.type === MessageType.DELETE_ROOM) {
      forEachValue(listenerManager.onDeleteRoom, (cb) => cb())
    } else if (parsedData.type === MessageType.ALERT_PREPARE) {
      forEachValue(listenerManager.onAlertPrepare, (cb) => cb())
    } else if (parsedData.type === MessageType.SYNC_PREPARE_TIMER) {
      const { leftTime } = parsedData.payload
      forEachValue(listenerManager.onSyncPrepareTimer, (cb) => cb(leftTime))
    } else if (parsedData.type === MessageType.INFORM_WINNER) {
      const { winner } = parsedData.payload;
      forEachValue(listenerManager.onInformWinner, (cb) => cb(winner))
    }
  }

  return multiGameSocket;
}

export default useMultiGameSocket;
