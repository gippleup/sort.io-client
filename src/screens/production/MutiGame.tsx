import React from 'react';
import GameScene from '@components/GameScene';
import {MapOption} from '@api/sortio';
import {RouteProp, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '@router/routes';
import {View} from 'react-native';
import {MultiGameLogic} from './MultiGame/_ComponentLogic';
import {OnSendRoomParam} from '@hooks/useMultiGameSocket';
import {SupportedSkin} from '@components/Block/skinMap';

type MultiGameRouteProps = RouteProp<RootStackParamList, 'MultiGame'>;
type MultiGameNavigationProps = NavigationProp<
  RootStackParamList,
  'MultiGame'
>;

export type MapDesc = MapOption & {difficulty: number};

export type MultiGameParams = OnSendRoomParam;

export type MultiGameProps = {
  route: MultiGameRouteProps;
  navigation: MultiGameNavigationProps;
};

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
    onPressExpression,
    global,
  } = MultiGameLogic(props);

  React.useEffect(useEffectCallback);

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
        playerSkin={(playerProfile.skin as SupportedSkin) || 'basic'}
        opponentSkin={(opponentProfile.skin as SupportedSkin) || 'basic'}
        timeLimit={60}
        isManualTimer
        maxScore={mapDesc.maxScore}
        onComplete={onComplete}
        onDock={onDock}
        onUndock={onUndock}
        onReady={onReady}
        timerRoundTo={0}
        opponentProfile={opponentProfile}
        onScoreChange={onScoreChange}
        playerProfile={playerProfile}
        noAnimation={!global.animationEnabled}
        onPressExpression={onPressExpression}
        expressions={global.expressions}
        playerDockEasingDuraton={300}
        playerDockEasing="easeOutBounce"
        opponentDockEasingDuration={300}
        opponentDockEasing="easeOutSine"
      />
    </View>
  );
};

export default MutiGame;
