import CancelGamePopup, { CancelGameParams } from "../screens/production/GameScreen/CancelGamePopup";
import StageClearPopup, { StageClearPopupParams } from "../screens/production/GameScreen/StageClearPopup";
import Main from "../screens/production/Main";
import GameResultPopup, { GameResultParams } from "../screens/production/MultiGame/GameResultPopup";
import OpponentLeftPopup from "../screens/production/MultiGame/OpponentLeftPopup";
import PreparePopup, { PreparePopupParams } from "../screens/production/MultiGame/PreparePopup";
import RematchWaitingPopup, { RematchWaitingPopupParams } from "../screens/production/MultiGame/RematchWaitingPopup";
import SelectStage from "../screens/production/SelectStage";
import NotEnoughTicketPopup from "../screens/production/SelectStage/NotEnoughTicketPopup";
import RankGraphPopup from "../screens/production/SelectStage/RankGraphPopup";
import SinglePlayRankPopup from "../screens/production/SelectStage/SinglePlayRankPopup";
import StartChallengePopup from "../screens/production/SelectStage/StartChallengePopup";
import StartTrainingPopup from "../screens/production/SelectStage/StartTrainingPopup";
import TicketPurchasePopup from "../screens/production/SelectStage/TicketPurchasePopup";
import MultigameWaitingPopup from '../screens/production/Main/MultiWaitingPopup';
import MultiGame, { MultiGameParams } from '../screens/production/MutiGame';
import Shop, { ShopParams } from "../screens/production/Shop";
import GameScreen, { GameScreenParams } from "../screens/production/SingleGame";
import SkinPreviewPopup, { SkinPreviewPopupParams } from "../screens/production/Shop/SkinPreviewPopup";
import { Routes, CommonPopupOption } from "./types";
import ItemPurchasePopup, { ItemPurchasePopupParams } from "../screens/production/Shop/ItemPurchasePopup";
import ExpressionPreviewPopup, { ExpressionPreviewPopupParams } from "../screens/production/Shop/ExpressionPreviewPopup";
import ExpressionEquipPopup, { ExpressionEquipParams } from "../screens/production/Shop/ExpressionEquip";
import NotEnoughMoneyPopup from "../screens/production/Shop/NotEnoughMoneyPopup";
import LeaderBoard from "../screens/production/LeaderBoard";
import ExitPopup from "../screens/production/Main/ExitPopup";
import WaitingOpponentPopup from "../screens/production/MultiGame/WaitingOpponentPopup";
import UpdateScreen from "../screens/UpdateScreen";
import BadConnectionPopup from "../screens/production/MultiGame/BadConnectionPopup";
import LoadingScreen, { LoadingScreenParams } from "../screens/production/LoadingScreen";
import SingleFeedback, { SingleFeedbackParams } from "../screens/production/SingleFeedback";

export const pdRoutes: Routes<pdParams> = {
  Main: {
    type: 'production',
    devName: '메인화면',
    component: Main,
    headerShown: false,
  },
  GameScene: {
    type: 'production',
    devName: '게임화면',
    component: GameScreen,
    headerShown: false,
  },
  SelectStage: {
    type: 'production',
    devName: '스테이지 선택 화면',
    component: SelectStage,
    headerShown: false,
    // header: SelectStageHeader,
  },
  Shop: {
    type: 'production',
    devName: '상점 화면',
    component: Shop,
    headerShown: false,
  },
  MultiGame: {
    type: 'production',
    devName: '멀티 게임',
    component: MultiGame,
    headerShown: false,
  },
  LeaderBoard: {
    type: "production",
    devName: "리더보드",
    component: LeaderBoard,
    headerShown: false,
  },
  ExpressionEquip: {
    type: "production",
    devName: "표현 장착 화면",
    component: ExpressionEquipPopup,
    headerShown: false,
  },
  Popup_OpponentLeft: {
    type: 'production',
    component: OpponentLeftPopup,
    devName: '상대방 나감 팝업',
    options: CommonPopupOption,
    invisibleOnDev: true,
  },
  Updater: {
    type: 'production',
    component: UpdateScreen,
    devName: '업데이터',
    invisibleOnDev: true,
    headerShown: false,
  },
  LoadingScreen: {
    type: "production",
    devName: "로딩중",
    component: LoadingScreen,
    headerShown: false,
  },
  Popup_CancelGame: {
    type: 'production',
    devName: '게임 중단 팝업',
    component: CancelGamePopup,
    options: CommonPopupOption,
    invisibleOnDev: true,
  },
  Popup_NotEnoughTicket: {
    type: 'production',
    devName: '티켓 부족 팝업',
    component: NotEnoughTicketPopup,
    options: CommonPopupOption,
    invisibleOnDev: true,
  },
  Popup_RankGraph: {
    type: 'production',
    devName: '랭크 그래프 팝업',
    component: RankGraphPopup,
    options: CommonPopupOption,
    invisibleOnDev: true,
  },
  Popup_StartChallenge: {
    type: 'production',
    devName: '챌린지 게임 팝업',
    component: StartChallengePopup,
    options: CommonPopupOption,
    invisibleOnDev: true,
  },
  Popup_StartTraining: {
    type: 'production',
    component: StartTrainingPopup,
    devName: '연습 게임 팝업',
    options: CommonPopupOption,
    invisibleOnDev: true,
  },
  Popup_TicketPurchase: {
    type: 'production',
    devName: '티켓 구매 팝업',
    component: TicketPurchasePopup,
    options: CommonPopupOption,
    invisibleOnDev: true,
  },
  Popup_SinglePlayRank: {
    type: 'production',
    devName: '싱글 게임 랭크 팝업',
    component: SinglePlayRankPopup,
    options: CommonPopupOption,
    invisibleOnDev: true,
  },
  Popup_StageClear: {
    type: 'production',
    component: StageClearPopup,
    devName: '스테이지 클리어 팝업',
    options: CommonPopupOption,
    invisibleOnDev: true,
  },
  Popup_MultiWaiting: {
    type: 'production',
    component: MultigameWaitingPopup,
    devName: '멀티 대기 팝업',
    options: CommonPopupOption,
    invisibleOnDev: true,
  },
  Popup_Prepare: {
    type: 'production',
    devName: '멀티 게임 준비 팝업',
    component: PreparePopup,
    options: CommonPopupOption,
    invisibleOnDev: true,
  },
  Popup_GameResult: {
    type: 'production',
    devName: '게임 결과 팝업',
    component: GameResultPopup,
    options: CommonPopupOption,
    invisibleOnDev: true,
  },
  Popup_RematchWaiting: {
    type: 'production',
    devName: '재대결 응답 대기 팝업',
    component: RematchWaitingPopup,
    options: CommonPopupOption,
    invisibleOnDev: true,
  },
  Popup_SkinPreview: {
    type: 'production',
    devName: '스킨 프리뷰 팝업',
    component: SkinPreviewPopup,
    options: CommonPopupOption,
  },
  Popup_ItemPurchase: {
    type: 'production',
    devName: '아이템 구매 팝업',
    component: ItemPurchasePopup,
    options: CommonPopupOption,
  },
  Popup_ExpressionPreview: {
    type: 'production',
    devName: '표현 프리뷰 팝업',
    component: ExpressionPreviewPopup,
    options: CommonPopupOption,
  },
  Popup_NotEnoughMoney: {
    type: "production",
    devName: "돈 부족함",
    component: NotEnoughMoneyPopup,
    options: CommonPopupOption,
  },
  Popup_Exit: {
    type: "production",
    devName: "게임종료",
    component: ExitPopup,
    options: CommonPopupOption,
  },
  Popup_WaitingOpponent: {
    type: "production",
    devName: "적놈을 기다리는 중",
    component: WaitingOpponentPopup,
    options: CommonPopupOption,
  },
  Popup_BadConnection: {
    type: "production",
    devName: "연결 상태가 나쁨",
    component: BadConnectionPopup,
    options: CommonPopupOption,
  },
  SingleFeedback: {
    type: "production",
    devName: "싱글 피드백",
    component: SingleFeedback,
    headerShown: false,
  }
}

export type pdParams = {
  Main: undefined;
  GameScene: GameScreenParams;
  SelectStage: undefined;
  Shop: ShopParams;
  MultiGame: MultiGameParams;
  ExpressionEquip: ExpressionEquipParams;
  LeaderBoard: undefined;
  Updater: undefined;
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
  Popup_SkinPreview: SkinPreviewPopupParams;
  Popup_ItemPurchase: ItemPurchasePopupParams;
  Popup_ExpressionPreview: ExpressionPreviewPopupParams;
  Popup_NotEnoughMoney: undefined;
  Popup_Exit: undefined;
  Popup_WaitingOpponent: undefined;
  Popup_BadConnection: undefined;
  LoadingScreen: LoadingScreenParams;
  SingleFeedback: SingleFeedbackParams;
}
