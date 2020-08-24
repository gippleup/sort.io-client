import React, {Component} from 'react';
import {Modal, Animated, Text, View, StyleSheet} from 'react-native';
import {
  TitleContainer,
  ContentContainer,
  SubContentContainer,
  RoundRectangleButton,
  Title,
  MetaStageInfo,
  CurStage,
  CurDifficulty,
  ClearRate,
  ButtonText,
  HorizontalSpaceBetween,
} from './EndGameInfo/_StyledComponents';
import {Space} from './Generic/StyledComponents';
import {prettyStage} from './EndGameInfo/utils';
import PercentIndicator from './EndGameInfo/PercentIndicator';
import DynamicText from './DynamicText';
import GameInfoContainer from './EndGameInfo/GameInfoContainer';
import AnimatedRateText from './EndGameInfo/AnimatedRateText';
import AnimatedBox from 'react-native-animated-box';
import {FlexHorizontal} from './Generic/StyledComponents';
import RankViewer from './RankViewer';

type EndGameInfoProp = {
  gameType: 'single' | 'multi';
  stage: number;
};

type EndGameInfoState = {
  gameState: 'success' | 'fail';
  modalVisible: boolean;
};

export class EndGameInfo extends Component<EndGameInfoProp, EndGameInfoState> {
  _modal = React.createRef<Modal>();
  _titleRef = React.createRef<DynamicText>();
  _percentageIndicatorRef = React.createRef<PercentIndicator>();
  _clearRateText = React.createRef<AnimatedRateText>();
  _mainButtonTextRef = React.createRef<DynamicText>();
  _subButtonTextRef = React.createRef<DynamicText>();
  _infoContainerRef = React.createRef<GameInfoContainer>();
  _thirdButtonContainer = React.createRef<AnimatedBox>();
  _thirdButtonTextRef = React.createRef<DynamicText>();
  percentageTextAnim = new Animated.Value(0);

  constructor(props: Readonly<EndGameInfoProp>) {
    super(props);

    this.state = {
      gameState: 'success',
      modalVisible: true,
    };

    this.renderResult = this.renderResult.bind(this);
    this.renderSingleGameResult = this.renderSingleGameResult.bind(this);
    this.renderMultiGameResult = this.renderMultiGameResult.bind(this);
  }

  alertSuccess() {
    const {props} = this;
    const {clearPercentage} = prettyStage(props.stage);
    this.setState({
      modalVisible: true,
    });
    this._titleRef.current?.setText('성공');
    this._infoContainerRef.current?.show()?.start(() => {
      this._animatePercent(clearPercentage)?.start();
    });
  }

  alertFail() {
    const {props} = this;
    const {clearPercentage} = prettyStage(props.stage);
    this.setState({
      modalVisible: true,
    });
    this._titleRef.current?.setText('실패!');
    this._subButtonTextRef.current?.setText('다시하기');
    this._infoContainerRef.current?.show()?.start(() => {
      this._animatePercent(clearPercentage)?.start();
    });
  }

  alertBattleResult() {
    this.setState({
      modalVisible: true,
    });
    this._titleRef.current?.setText('패배!');
    this._subButtonTextRef.current?.setText('재대결 요청');
    this._thirdButtonContainer.current?.setStyle({
      display: 'flex',
      width: '100%',
      opacity: 1,
    });
  }

  _animatePercent = (percent: number) => {
    const animations = [];
    if (this._percentageIndicatorRef.current && this._clearRateText.current) {
      const fillAnim = this._percentageIndicatorRef.current.animateFill(
        percent,
      );
      const clearRateAnim = this._clearRateText.current.animateTo(percent);
      if (fillAnim) {
        animations.push(fillAnim);
        animations.push(clearRateAnim);
      }
      return Animated.parallel(animations);
    }
  };

  renderSingleGameResult() {
    const {props} = this;
    const {_percentageIndicatorRef, _clearRateText} = this;
    const {bigStageNum, difficulty, smallStageNum} = prettyStage(props.stage);

    const curStageText = `${difficulty.toUpperCase()} ${bigStageNum}-${smallStageNum}`;

    return (
      <SubContentContainer>
        <MetaStageInfo value="현재 스테이지" />
        <CurStage value={curStageText} />
        <PercentIndicator ref={_percentageIndicatorRef} value={0} />
        <FlexHorizontal>
          <CurDifficulty value={`${difficulty?.toUpperCase()} `} />
          <ClearRate ref={_clearRateText} initialValue={0} postfix="% 완료" />
        </FlexHorizontal>
      </SubContentContainer>
    );
  }

  renderMultiGameResult() {
    return (
      <SubContentContainer>
        <HorizontalSpaceBetween>
          <Text>대전 기록</Text>
          <Text>128전 82승 32패 10무</Text>
        </HorizontalSpaceBetween>
        <HorizontalSpaceBetween>
          <Text>승률</Text>
          <Text>87.5%</Text>
        </HorizontalSpaceBetween>
        <Space height={10} />
        <RankViewer style={styles.rankViewer} borderWidth={2} />
      </SubContentContainer>
    );
  }

  renderResult() {
    const {props, renderSingleGameResult, renderMultiGameResult} = this;
    if (props.gameType === 'single') {
      return renderSingleGameResult();
    } else {
      return renderMultiGameResult();
    }
  }

  render() {
    const {state, renderResult} = this;
    const {
      _titleRef,
      _modal,
      _infoContainerRef,
      _mainButtonTextRef,
      _subButtonTextRef,
      _thirdButtonContainer,
      _thirdButtonTextRef,
    } = this;
    return (
      <Modal ref={_modal} visible={state.modalVisible} transparent>
        <GameInfoContainer ref={_infoContainerRef}>
          <TitleContainer>
            <Title ref={_titleRef} value="승리" />
          </TitleContainer>
          <ContentContainer>
            {renderResult()}
            <Space height={20} />
            <SubContentContainer>
              <FlexHorizontal>
                <RoundRectangleButton width={100} onPress={() => {}}>
                  <ButtonText ref={_mainButtonTextRef} value="홈" />
                </RoundRectangleButton>
                <Space width={10} />
                <RoundRectangleButton flex onPress={() => {}}>
                  <ButtonText ref={_subButtonTextRef} value="다음 스테이지" />
                </RoundRectangleButton>
              </FlexHorizontal>
              <AnimatedBox
                ref={_thirdButtonContainer}
                style={styles.thirdButtonContainer}>
                <Space height={8} />
                <RoundRectangleButton onPress={() => {}}>
                  <ButtonText ref={_thirdButtonTextRef} value="새로운 대결" />
                </RoundRectangleButton>
              </AnimatedBox>
            </SubContentContainer>
          </ContentContainer>
        </GameInfoContainer>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  thirdButtonContainer: {display: 'none', opacity: 0},
  rankViewer: {height: 200, width: '100%', borderColor: 'rgba(0,0,0,0.5)'},
});

export default EndGameInfo;
