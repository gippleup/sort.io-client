import React from 'react';
import { configureSocket } from '../api/sortio';
import usePlayData from './usePlayData';
import { SocketServerMessages, SocketServerMessageTypes, AlertDockConstructor } from './useMultiGameSocket/ServerMessages';
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
};

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
    close: (e: WebSocketCloseEvent) => {
      if (socket) {
        Object.values(listenerManager.onClose)
          .forEach((callback) => callback(e))
        socket.close();
        socket = null;
      }
    },
    readyState: socket.readyState,
  }).current;

  socket.onopen = () => {
    Object.values(listenerManager.onOpen)
      .forEach((callback) => callback())
  }

  socket.onerror = (e) => {
    Object.values(listenerManager.onError)
      .forEach((callback) => callback(e))
  }

  socket.onmessage = (e) => {
    Object.values(listenerManager.onMessage)
      .forEach((callback) => callback(e))

    const parsedData: SocketServerMessages = JSON.parse(e.data);
    if (parsedData.type === SocketServerMessageTypes.SEND_ROOM) {
      const { map, mapDesc, roomId } = parsedData.payload;
      Object.values(listenerManager.onSendRoom)
        .forEach((callback) => callback({map, mapDesc, roomId}))
    } else if (parsedData.type === SocketServerMessageTypes.ALERT_DOCK) {
      const option = parsedData.payload;
      Object.values(listenerManager.onAlertDock)
        .forEach((callback) => callback(option))
    } else if (parsedData.type === SocketServerMessageTypes.SYNC_TIMER) {
      const { leftTime } = parsedData.payload;
      Object.values(listenerManager.onSyncTimer)
        .forEach((callback) => callback(leftTime))
    } else if (parsedData.type === SocketServerMessageTypes.DELETE_ROOM) {
      Object.values(listenerManager.onDeleteRoom)
        .forEach((callback) => callback())
    }
  }

  return multiGameSocket;
}

export default useMultiGameSocket;
