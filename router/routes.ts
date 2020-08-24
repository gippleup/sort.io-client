import BlockBoardTester from '../screens/dev/BlockBoardTester';
import EndGameInfoTester from '../screens/dev/EndGameInfoTester';
import ScoreCheckerTester from '../screens/dev/ScoreCheckerTester';
import ItemBoxTester from '../screens/dev/ItemBoxTester';
import ProfileTester from '../screens/dev/ProfileTester';
import PurchaseBoxTester from '../screens/dev/PurchaseBoxTester';
import RankViewerTester from '../screens/dev/RankViewerTester';
import SettingsTester from '../screens/dev/SettingsTester';
import GameScreen, { GameScreenParams } from '../screens/production/GameScreen';
import Main from '../screens/production/Main';
import SelectStage from '../screens/production/SelectStage';
import Shop from '../screens/production/Shop';
import TimerTester from '../screens/dev/TimerTester';
import RefBoxTester from '../screens/dev/RefBoxTester';
import RefBlockBoardTester from '../screens/dev/RefBlockBoardTester';
import GoogleSignInTester from '../screens/dev/GoogleSignInTester';
import CountryFlagIconTester from '../screens/dev/CountryFlagIconTester';
import GameSceneTester from '../screens/dev/GameSceneTester';
import MultiGameTester from '../screens/dev/MultiGameTester';
import { StackHeaderProps } from '@react-navigation/stack';
import GraphTester from '../screens/dev/GraphTester';
import AsyncStorageController from '../screens/dev/AsyncStorageController';

type Routes = {
  [index in keyof RootStackParamList]: {
    devName: string;
    component: React.FunctionComponent | React.ComponentClass;
    type?: 'dev' | 'production';
    headerShown?: boolean;
    header?: React.FunctionComponent<StackHeaderProps>;
  };
};

const routes: Routes = {
  RefBoxTester: {
    devName: '레프 박스 테스터',
    component: RefBoxTester,
    headerShown: false,
  },
  RefBlockBoardTester: {
    devName: '레프 블록보드 테스터',
    component: RefBlockBoardTester,
  },
  BlockBoardTester: {
    devName: '블록보드 테스터',
    component: BlockBoardTester,
    headerShown: false,
  },
  TimerTester: {
    devName: '타이머 테스터',
    component: TimerTester,
  },
  ScoreCheckerTester: {
    devName: '점수 기록기 테스터',
    component: ScoreCheckerTester,
  },
  GameSceneTester: {
    devName: '게임씬 테스터',
    component: GameSceneTester,
    headerShown: false,
  },
  EndGameInfoTester: {
    devName: '종료 팝업 테스터',
    component: EndGameInfoTester,
  },
  ItemBoxTester: {
    devName: '샵 아이템 박스 테스터',
    component: ItemBoxTester,
  },
  ProfileTester: {
    devName: '프로필 테스터',
    component: ProfileTester,
  },
  PurchaseBoxTester: {
    devName: '구매창 테스터',
    component: PurchaseBoxTester,
  },
  RankViewerTester: {
    devName: '랭크 보기 테스터',
    component: RankViewerTester,
  },
  SettingsTester: {
    devName: '설정창 테스터',
    component: SettingsTester,
  },
  GoogleSignInTester: {
    devName: '구글 로그인',
    component: GoogleSignInTester,
  },
  FlagIconTester: {
    devName: '국가 아이콘',
    component: CountryFlagIconTester,
  },
  MultiGameTester: {
    devName: '멀티게임',
    component: MultiGameTester,
    headerShown: false,
  },
  GraphTester: {
    devName: '그래프',
    component: GraphTester,
    headerShown: false,
  },
  AsyncStorageController: {
    devName: '로컬 데이터 관리',
    component: AsyncStorageController,
    headerShown: false,
  },
  PD_Main: {
    type: 'production',
    devName: '메인화면',
    component: Main,
    headerShown: false,
  },
  PD_GameScene: {
    type: 'production',
    devName: '게임화면',
    component: GameScreen,
    headerShown: false,
  },
  PD_SelectStage: {
    type: 'production',
    devName: '스테이지 선택 화면',
    component: SelectStage,
    headerShown: false,
    // header: SelectStageHeader,
  },
  PD_Shop: {
    type: 'production',
    devName: '상점 화면',
    component: Shop,
    headerShown: false,
  },
};

export type RootStackParamList = {
  AsyncStorageController: undefined;
  RefBoxTester: undefined;
  RefBlockBoardTester: undefined;
  BlockBoardTester: undefined;
  TimerTester: undefined;
  ScoreCheckerTester: undefined;
  GameSceneTester: undefined;
  EndGameInfoTester: undefined;
  ItemBoxTester: undefined;
  ProfileTester: undefined;
  PurchaseBoxTester: undefined;
  RankViewerTester: undefined;
  SettingsTester: undefined;
  GoogleSignInTester: undefined;
  FlagIconTester: undefined;
  MultiGameTester: undefined;
  Developer: undefined;
  GraphTester: undefined;
  PD_Main: undefined;
  PD_GameScene: GameScreenParams;
  PD_SelectStage: undefined;
  PD_Shop: undefined;
}

export default routes;
