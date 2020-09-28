import BlockBoardTester from '../screens/dev/BlockBoardTester';
import EndGameInfoTester from '../screens/dev/EndGameInfoTester';
import ScoreCheckerTester from '../screens/dev/ScoreCheckerTester';
import ItemBoxTester from '../screens/dev/ItemBoxTester';
import ProfileTester from '../screens/dev/ProfileTester';
import PurchaseBoxTester from '../screens/dev/PurchaseBoxTester';
import RankViewerTester from '../screens/dev/RankViewerTester';
import SettingsTester from '../screens/dev/SettingsTester';
import GameScreen, { GameScreenParams } from '../screens/production/SingleGame';
import Main from '../screens/production/Main';
import SelectStage from '../screens/production/SelectStage';
import Shop from '../screens/production/Shop';
import MultiGame, { MultiGameParams } from '../screens/production/MutiGame';
import TimerTester from '../screens/dev/TimerTester';
import RefBoxTester from '../screens/dev/RefBoxTester';
import RefBlockBoardTester from '../screens/dev/RefBlockBoardTester';
import GoogleSignInTester from '../screens/dev/GoogleSignInTester';
import CountryFlagIconTester from '../screens/dev/CountryFlagIconTester';
import GameSceneTester from '../screens/dev/GameSceneTester';
import { StackHeaderProps, StackNavigationOptions } from '@react-navigation/stack';
import GraphTester from '../screens/dev/GraphTester';
import AsyncStorageController from '../screens/dev/AsyncStorageController';
import CancelGamePopup, { CancelGameParams } from '../screens/production/GameScreen/CancelGamePopup';
import { cardTransitions } from './cardTransition';
import NotEnoughTicketPopup from '../screens/production/SelectStage/NotEnoughTicketPopup';
import RankGraphPopup from '../screens/production/SelectStage/RankGraphPopup';
import StartChallengePopup from '../screens/production/SelectStage/StartChallengePopup';
import StartTrainingPopup from '../screens/production/SelectStage/StartTrainingPopup';
import TicketPurchasePopup from '../screens/production/SelectStage/TicketPurchasePopup';
import SinglePlayRankPopup from '../screens/production/SelectStage/SinglePlayRankPopup';
import ParticleTester from '../screens/dev/ParticleTester';
import NativeRefTester from '../screens/dev/NativeRefTester';
import ForFun from '../screens/dev/ForFun';
import StageClearPopup, { StageClearPopupParams } from '../screens/production/GameScreen/StageClearPopup';
import AnimatedNumberTester from '../screens/dev/AnimatedNumberTester';
import MultigameWaitingPopup from '../screens/production/Main/MultiWaitingPopup';
import PreparePopup, { PreparePopupParams } from '../screens/production/MultiGame/PreparePopup';
import GameResultPopup, { GameResultParams } from '../screens/production/MultiGame/GameResultPopup';
import RematchWaitingPopup, { RematchWaitingPopupParams } from '../screens/production/MultiGame/RematchWaitingPopup';
import OpponentLeftPopup from '../screens/production/MultiGame/OpponentLeftPopup';

type Routes = {
  [T in keyof RootStackParamList]: {
    devName: string;
    component: React.FunctionComponent<any> | React.ComponentClass<any, any> | React.FC<any>;
    type?: 'dev' | 'production';
    headerShown?: boolean;
    header?: React.FunctionComponent<StackHeaderProps>;
    options?: StackNavigationOptions;
  };
};

const CommonPopupOption: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  headerShown: false,
  cardStyleInterpolator: cardTransitions.forFade,
}

const routes: Omit<Routes, "Developer"> = {
  AnimatedNumberTester: {
    type: "dev",
    devName: '숫자 애니메이팅 테스터',
    component: AnimatedNumberTester,
    headerShown: false,
  },
  ForFun: {
    type: "dev",
    devName: '애니메이팅 꿀잼',
    component: ForFun,
    headerShown: false,
  },
  NativeRefTester: {
    type: "dev",
    devName: '네이티브 레프 테스터',
    component: NativeRefTester,
    headerShown: false,
  },
  RefBoxTester: {
    type: "dev",
    devName: '레프 박스 테스터',
    component: RefBoxTester,
    headerShown: false,
  },
  RefBlockBoardTester: {
    type: "dev",
    devName: '레프 블록보드 테스터',
    component: RefBlockBoardTester,
  },
  BlockBoardTester: {
    type: "dev",
    devName: '블록보드 테스터',
    component: BlockBoardTester,
    headerShown: false,
  },
  ParticleTester: {
    type: "dev",
    devName: '파티클 테스터',
    component: ParticleTester,
    headerShown: false,
  },
  TimerTester: {
    type: "dev",
    component: TimerTester,
    devName: '타이머 테스터',
  },
  ScoreCheckerTester: {
    type: "dev",
    devName: '점수 기록기 테스터',
    component: ScoreCheckerTester,
  },
  GameSceneTester: {
    type: "dev",
    devName: '게임씬 테스터',
    component: GameSceneTester,
    headerShown: false,
  },
  EndGameInfoTester: {
    type: "dev",
    devName: '종료 팝업 테스터',
    component: EndGameInfoTester,
  },
  ItemBoxTester: {
    type: "dev",
    devName: '샵 아이템 박스 테스터',
    component: ItemBoxTester,
  },
  ProfileTester: {
    type: "dev",
    devName: '프로필 테스터',
    component: ProfileTester,
  },
  PurchaseBoxTester: {
    type: "dev",
    devName: '구매창 테스터',
    component: PurchaseBoxTester,
  },
  RankViewerTester: {
    type: "dev",
    devName: '랭크 보기 테스터',
    component: RankViewerTester,
  },
  SettingsTester: {
    type: "dev",
    devName: '설정창 테스터',
    component: SettingsTester,
  },
  GoogleSignInTester: {
    type: "dev",
    devName: '구글 로그인',
    component: GoogleSignInTester,
  },
  FlagIconTester: {
    type: "dev",
    devName: '국가 아이콘',
    component: CountryFlagIconTester,
  },
  GraphTester: {
    type: "dev",
    devName: '그래프',
    component: GraphTester,
    headerShown: false,
  },
  AsyncStorageController: {
    type: "dev",
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
  PD_MultiGame: {
    type: 'production',
    devName: '멀티 게임',
    component: MultiGame,
    headerShown: false,
  },
  Popup_OpponentLeft: {
    type: 'production',
    component: OpponentLeftPopup,
    devName: '상대방 나감 팝업',
    options: CommonPopupOption,
  },
  Popup_CancelGame: {
    type: 'production',
    devName: '게임 중단 팝업',
    component: CancelGamePopup,
    options: CommonPopupOption
  },
  Popup_NotEnoughTicket: {
    type: 'production',
    devName: '티켓 부족 팝업',
    component: NotEnoughTicketPopup,
    options: CommonPopupOption
  },
  Popup_RankGraph: {
    type: 'production',
    devName: '랭크 그래프 팝업',
    component: RankGraphPopup,
    options: CommonPopupOption
  },
  Popup_StartChallenge: {
    type: 'production',
    devName: '챌린지 게임 팝업',
    component: StartChallengePopup,
    options: CommonPopupOption
  },
  Popup_StartTraining: {
    type: 'production',
    component: StartTrainingPopup,
    devName: '연습 게임 팝업',
    options: CommonPopupOption
  },
  Popup_TicketPurchase: {
    type: 'production',
    devName: '티켓 구매 팝업',
    component: TicketPurchasePopup,
    options: CommonPopupOption
  },
  Popup_SinglePlayRank: {
    type: 'production',
    devName: '싱글 게임 랭크 팝업',
    component: SinglePlayRankPopup,
    options: CommonPopupOption
  },
  Popup_StageClear: {
    type: 'production',
    component: StageClearPopup,
    devName: '스테이지 클리어 팝업',
    options: CommonPopupOption
  },
  Popup_MultiWaiting: {
    type: 'production',
    component: MultigameWaitingPopup,
    devName: '멀티 대기 팝업',
    options: CommonPopupOption,
  },
  Popup_Prepare: {
    type: 'production',
    devName: '멀티 게임 준비 팝업',
    component: PreparePopup,
    options: CommonPopupOption,
  },
  Popup_GameResult: {
    type: 'production',
    devName: '게임 결과 팝업',
    component: GameResultPopup,
    options: CommonPopupOption,
  },
  Popup_RematchWaiting: {
    type: 'production',
    devName: '재대결 응답 대기 팝업',
    component: RematchWaitingPopup,
    options: CommonPopupOption,
  }
};

export type RootStackParamList = {
  AnimatedNumberTester: undefined;
  ForFun: undefined;
  ParticleTester: undefined;
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
  Developer: undefined;
  GraphTester: undefined;
  NativeRefTester: undefined;
  PD_Main: undefined;
  PD_GameScene: GameScreenParams;
  PD_SelectStage: undefined;
  PD_Shop: undefined;
  PD_MultiGame: MultiGameParams;
  Popup_OpponentLeft: undefined;
  Popup_CancelGame: CancelGameParams;
  Popup_NotEnoughTicket: undefined;
  Popup_RankGraph: undefined;
  Popup_StartChallenge: undefined;
  Popup_StartTraining: undefined;
  Popup_TicketPurchase: undefined;
  Popup_SinglePlayRank: undefined;
  Popup_StageClear: StageClearPopupParams;
  Popup_MultiWaiting: undefined;
  Popup_Prepare: PreparePopupParams;
  Popup_GameResult: GameResultParams;
  Popup_RematchWaiting: RematchWaitingPopupParams;
}

export default routes;
