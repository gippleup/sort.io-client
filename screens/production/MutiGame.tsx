import React from 'react'
import GameScene from '../../components/GameScene';
import { MapOption } from '../../api/sortio';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../router/routes';
import { View } from 'react-native';
import { MultiGameLogic } from './MultiGame/_ComponentLogic';
import { OnSendRoomParam } from '../../hooks/useMultiGameSocket';
import { SupportedSkin } from '../../components/Block/skinMap';

type MultiGameRouteProps = RouteProp<RootStackParamList, "PD_MultiGame">;
type MultiGameNavigationProps = NavigationProp<RootStackParamList, "PD_MultiGame">;

export type MapDesc = MapOption & { difficulty: number };

export type MultiGameParams = OnSendRoomParam;

export type MultiGameProps = {
  route: MultiGameRouteProps;
  navigation: MultiGameNavigationProps;
}

export const MutiGame = (props: MultiGameProps) => {
  const {
    containerRef,
    gameSceneRef,
    map,
    mapDesc,
    onReady,
    onComplete,
    onDock,
    onUndock,
    onScoreChange,
    opponentProfile,
    playerProfile,
    useEffectCallback,
  } = MultiGameLogic(props);

  React.useEffect(useEffectCallback)

  if (!map) {
    return <></>;
  }

  return (
    <View ref={containerRef} style={{flex: 1}} pointerEvents="none">
      <GameScene
        ref={gameSceneRef}
        mode={'multi'}
        title={'멀티게임'}
        map={map}
        playerSkin={playerProfile.skin as SupportedSkin || "basic"}
        opponentSkin={opponentProfile.skin as SupportedSkin || "basic"}
        timeLimit={60}
        isManualTimer
        maxScore={mapDesc.maxScore}
        onComplete={onComplete}
        onDock={onDock}
        onUndock={onUndock}
        onReady={onReady}
        timerRoundTo={3}
        opponentProfile={opponentProfile}
        onScoreChange={onScoreChange}
        playerProfile={playerProfile}
        noAnimation={false}
        // noAnimation 이걸 리덕스로 다뤄야 함. 메인에 버튼 하나 만들고 그걸로 리덕스 상태 변경하기
      />
    </View>
  );
}

export default MutiGame
