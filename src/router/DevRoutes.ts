import AdmobTester from "@screens/dev/AdmobTester";
import AnimatedNumberTester from "@screens/dev/AnimatedNumberTester";
import AsyncStorageController from "@screens/dev/AsyncStorageController";
import BlockBoardTester from "@screens/dev/BlockBoardTester";
import ColorTester from "@screens/dev/ColorTester";
import CountryFlagIconTester from "@screens/dev/CountryFlagIconTester";
import EternalBlockBoardTester from "@screens/dev/EternalBlockBoardTester";
import ForFun from "@screens/dev/ForFun";
import GameSceneTester from "@screens/dev/GameSceneTester";
import ItemBoxTester from "@screens/dev/ItemBoxTester";
import JamTester from "@screens/dev/JamTester";
import LineGraphTester from "@screens/dev/LineGraphTester";
import MultiFoldTimerBarTester from "@screens/dev/MultiFoldTimerBarTester";
import MultiGameResultTester from "@screens/dev/MultiGameResultTester";
import NativeRefTester from "@screens/dev/NativeRefTester";
import ParticleTester from "@screens/dev/ParticleTester";
import ProfileTester from "@screens/dev/ProfileTester";
import PurchaseBoxTester from "@screens/dev/PurchaseBoxTester";
import RankViewerTester from "@screens/dev/RankViewerTester";
import ReduxTester from "@screens/dev/ReduxTester";
import RefBlockBoardTester from "@screens/dev/RefBlockBoardTester";
import RefBoxTester from "@screens/dev/RefBoxTester";
import ScoreCheckerTester from "@screens/dev/ScoreCheckerTester";
import SettingsTester from "@screens/dev/SettingsTester";
import ShapeChecker from "@screens/dev/ShapeChecker";
import SpreaderTester from "@screens/dev/SpreaderTester";
import TimerTester from "@screens/dev/TimerTester";
import UpdaterTester from "@screens/dev/UpdaterTester";
import BlockStackTester from '@screens/dev/PropBlockStack2021Tester';
import { Routes } from "./types";
import BlockBoard2021Tester from "@screens/dev/PropBlockBoard2021Tester";
import RefBlockStackTester from "@screens/dev/RefBlockStackTester";
import AnimatedRefBoxTester from "@screens/dev/AnimatedRefBoxTester";
import ReanimatedRefBoxTester from "@screens/dev/ReanimatedRefBoxTester";

export const devRoutes: Routes<Omit<devParams, "Developer">> = {
  ReanimatedRefBoxTester: {
    type: "dev",
    devName: "Reanimated 레프 박스 테스터",
    component: ReanimatedRefBoxTester,
    headerShown: false,
  },
  AnimatedRefBoxTester: {
    type: "dev",
    devName: "Animated 레프 박스 테스터",
    component: AnimatedRefBoxTester,
    headerShown: false,
  },
  RefBlockStack2021Tester: {
    type: "dev",
    devName: "Ref 블록스택2021 테스터",
    component: RefBlockStackTester,
    headerShown: false,
  },
  PropBlockBoard2021Tester: {
    type: "dev",
    devName: "Prop 블록보드2021 테스터",
    component: BlockBoard2021Tester,
    headerShown: false,
  },
  EternalBlockBoardTester: {
    type: "dev",
    devName: "이터널 보드 테스터",
    component: EternalBlockBoardTester,
    headerShown: false,
  },
  PropBlockStackTester: {
    type: "dev",
    devName: "Prop 블록스택 테스터",
    component: BlockStackTester,
    headerShown: false,
  },
  MultiFoldTimerBarTester: {
    type: "dev",
    devName: "멀티 폴드 타이머바 테스터",
    component: MultiFoldTimerBarTester,
    headerShown: false,
  },
  SpreaderTester: {
    type: "dev",
    devName: "스프레더 테스터",
    component: SpreaderTester,
    headerShown: false,
  },
  LineGraphTester: {
    type: "dev",
    devName: "선형 그래프 테스터",
    component: LineGraphTester,
    headerShown: false,
  },
  ShapeChecker: {
    type: "dev",
    devName: "모양을 보자",
    component: ShapeChecker,
    headerShown: false,
  },
  JamTester: {
    type: "dev",
    devName: "꿀잼 테스터",
    component: JamTester,
    headerShown: true,
  },
  ReduxTester: {
    type: "dev",
    devName: "리덕스 테스터",
    component: ReduxTester,
  },
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
  FlagIconTester: {
    type: "dev",
    devName: '국가 아이콘',
    component: CountryFlagIconTester,
  },
  ColorTester: {
    type: "dev",
    devName: '컬러 테스터',
    component: ColorTester,
    headerShown: false,
  },
  AsyncStorageController: {
    type: "dev",
    devName: '로컬 데이터 관리',
    component: AsyncStorageController,
    headerShown: false,
  },
  AdmobTester: {
    type: "dev",
    devName: '애드몹 테스터',
    component: AdmobTester,
    headerShown: false,
  },
  MultiGameResultTester: {
    type: "dev",
    devName: "멀티게임 결과 테스터",
    component: MultiGameResultTester,
    headerShown: false,
  },
  UpdaterTester: {
    type: "dev",
    devName: "업데이터 테스터",
    component: UpdaterTester,
    headerShown: false,
  },
}

export type devParams = {
  EternalBlockBoardTester: undefined;
  MultiFoldTimerBarTester: undefined;
  LineGraphTester: undefined;
  ShapeChecker: undefined;
  ReduxTester: undefined;
  AnimatedNumberTester: undefined;
  ForFun: undefined;
  ParticleTester: undefined;
  AsyncStorageController: undefined;
  RefBoxTester: undefined;
  RefBlockBoardTester: undefined;
  BlockBoardTester: undefined;
  TimerTester: undefined;
  ColorTester: undefined;
  ScoreCheckerTester: undefined;
  GameSceneTester: undefined;
  ItemBoxTester: undefined;
  ProfileTester: undefined;
  PurchaseBoxTester: undefined;
  RankViewerTester: undefined;
  SettingsTester: undefined;
  FlagIconTester: undefined;
  Developer: undefined;
  NativeRefTester: undefined;
  AdmobTester: undefined;
  MultiGameResultTester: undefined;
  JamTester: undefined;
  UpdaterTester: undefined;
  SpreaderTester: undefined;
  PropBlockStackTester: undefined;
  PropBlockBoard2021Tester: undefined;
  RefBlockStack2021Tester: undefined;
  AnimatedRefBoxTester: undefined;
  ReanimatedRefBoxTester: undefined;
}
