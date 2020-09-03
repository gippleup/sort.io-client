import React, { Component } from 'react'
import { Text, View } from 'react-native'
import GameScene from './GameScene';
import { BlockTypes } from './Block/Types';
import { generateMap, MapOption, configureSocket } from '../api/sortio';
import usePlayData from '../hooks/usePlayData';

type MultiGameProps = {
  mapOption: MapOption;
}

export const MutiGame = (props: MultiGameProps) => {
  const [map, setMap] = React.useState<number[][] | null>(null);
  const roomId = React.useRef<null | number>(null);
  const socket = React.useRef(configureSocket()).current;
  const gameSceneRef = React.createRef<GameScene>();
  const playData = usePlayData();

  socket.onopen = () => {
    socket.send(JSON.stringify({
      type: 'ENTER',
      payload: {
        userId: playData.user.id,
      }
    }));
  }

  socket.onerror = (e) => {
    console.log('에러남', e);
  }

  socket.onmessage = (e) => {
    const parsedData = JSON.parse(e.data);
    if (parsedData.type === "MATCH") {
      setMap(parsedData.payload.map);
      roomId.current = parsedData.payload.roomId;
    }
    if (parsedData.type === "DOCK" || parsedData.type === "UNDOCK") {
      const {userId, stackIndex, roomId} = parsedData.payload;
      const $opponentBoard = gameSceneRef.current?.opponentBoardRef.current;
      if (userId !== playData.user.id) {
        if (parsedData.type === "UNDOCK") {
          $opponentBoard?.undock(stackIndex);
        }
        if (parsedData.type === "DOCK") {
          $opponentBoard?.dock(stackIndex);
        }
      }
    }
    console.log(parsedData);
  }

  React.useEffect(() => {
    return () => {
    }
  })

  if (!map) {
    return <></>;
  }

  return (
    <GameScene
      ref={gameSceneRef}
      mode={'multi'}
      title={'하드'}
      map={map}
      skin="spiky"
      timeLimit={60}
      maxScore={props.mapOption.maxScore}
      onComplete={() => console.log('끝남')}
      onDock={(stackIndex) => {
        socket.send(JSON.stringify({
          type: 'DOCK',
          payload: {
            userId: playData.user.id,
            stackIndex: stackIndex,
            roomId: roomId.current,
          }
        }))
      }}
      onUndock={(stackIndex) => {
        socket.send(JSON.stringify({
          type: 'UNDOCK',
          payload: {
            userId: playData.user.id,
            stackIndex: stackIndex,
            roomId: roomId.current,
          }
        }))
      }}
    />
  );
}

export default MutiGame
