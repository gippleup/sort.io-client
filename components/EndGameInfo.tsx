import React, {Component} from 'react';
import {Modal, Dimensions, Animated, View, TextInput} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../redux/reducers';
import {
  GameInfoContainer,
  TitleContainer,
  Title,
  InfoText,
  ContentContainer,
  SubContentContainer,
  Space,
  PercentageText,
  FlexHorizontal,
  RoundRectangleButton,
} from './EndGameInfo/styledComponents';
import {prettyStage, prettyPercent} from './EndGameInfo/utils';
import PercentIndicator from './EndGameInfo/PercentIndicator';
import AnimatedBox from 'react-native-animated-box';

type EndGameInfoProp = {
  gameType: 'single' | 'multi';
  stage: number;
};

type EndGameInfoState = {
  gameState: 'success' | 'fail';
  modalVisible: boolean;
};

export class EndGameInfo extends Component<EndGameInfoProp, EndGameInfoState> {
  _percentageIndicatorRef = React.createRef<PercentIndicator>();
  _percentageTextRef = React.createRef<TextInput>();
  _infoContainerRef = React.createRef<AnimatedBox>();
  percentageTextAnim = new Animated.Value(0);
  constructor(props: Readonly<EndGameInfoProp>) {
    super(props);
    const {clearPercentage} = prettyStage(props.stage);
    this.state = {
      gameState: 'success',
      modalVisible: false,
    };
    this.percentageTextAnim.setValue(clearPercentage);
    this.percentageTextAnim.addListener((state) => {
      if (this._percentageTextRef.current) {
        this._percentageTextRef.current.setNativeProps({
          text: prettyPercent(state.value) + '% 완료',
        });
      }
    });
  }

  text = {
    kor: {
      success: '성공',
      fail: '실패',
      win: '승리',
      defeat: '패배',
    },
  };

  show = () => {
    if (this.state.modalVisible) {
      return;
    }
    this.setState({
      modalVisible: true,
    });
    this.setInfoContainerOpacity(0);
    this.animateInfoContainerOpacity(1);
  };

  hide = () => {
    if (!this.state.modalVisible) {
      return;
    }
    this.setState({
      modalVisible: false,
    });
    this.setInfoContainerOpacity(1);
    this.animateInfoContainerOpacity(0);
  };

  setInfoContainerOpacity = (opacity: number) => {
    if (!this._infoContainerRef.current) {
      return;
    }
    this._infoContainerRef.current.style.opacity.setValue(opacity);
  }

  animateInfoContainerOpacity = (opacity: number) => {
    if (!this._infoContainerRef.current) {
      return;
    }
    Animated.timing(this._infoContainerRef.current?.style.opacity, {
      toValue: opacity,
      useNativeDriver: false,
    }).start();
  };

  animatePercent = (percent: number) => {
    if (!this._percentageIndicatorRef.current) {
      return;
    } else {
      this._percentageIndicatorRef.current.animateFill(percent);
      Animated.timing(this.percentageTextAnim, {
        toValue: percent,
        useNativeDriver: false,
      }).start();
    }
  };

  render() {
    const {
      props,
      state,
      _percentageIndicatorRef,
      _percentageTextRef,
      _infoContainerRef,
    } = this;
    const {
      bigStageNum,
      difficulty,
      smallStageNum,
      clearPercentage,
    } = prettyStage(props.stage);
    const renderStageText = () => {
      if (state.gameState === 'success') {
        return `${difficulty.toUpperCase()} ${bigStageNum}-${smallStageNum}`;
      }
      if (state.gameState === 'fail') {
        return `${difficulty.toUpperCase()} ${bigStageNum}-${smallStageNum}`;
      }
    };

    return (
      <Modal visible={state.modalVisible} animated transparent>
        <AnimatedBox
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          ref={_infoContainerRef}>
          <TitleContainer>
            <Title fontFamily="NotoSansKR-Black" size={30}>
              승리
            </Title>
          </TitleContainer>
          <ContentContainer>
            <SubContentContainer>
              <Space height={15} />
              <InfoText fontFamily="NotoSansKR-Bold" size={15}>
                현재 스테이지
              </InfoText>
              <InfoText color="yellow" fontFamily="NotoSansKR-Black" size={40}>
                {renderStageText()}
              </InfoText>
              <Space height={7} />
              <PercentIndicator
                ref={_percentageIndicatorRef}
                borderRadius={20}
                color="grey"
                borderColor="black"
                borderWidth={2}
                value={clearPercentage}
                height={20}
                width={Dimensions.get('screen').width - 120}
              />
              <Space height={3} />
              <FlexHorizontal>
                <InfoText fontFamily="NotoSansKR-Bold">
                  {`${difficulty?.toUpperCase()} `}
                </InfoText>
                <PercentageText
                  ref={_percentageTextRef}
                  // eslint-disable-next-line react-native/no-inline-styles
                  fontFamily="NotoSansKR-Bold"
                  value={prettyPercent(clearPercentage) + '% 완료'}
                  editable={false}
                />
              </FlexHorizontal>
              <Space height={10} />
            </SubContentContainer>
            <SubContentContainer>
              <FlexHorizontal>
                <Space width={20} />
                <RoundRectangleButton width={100} onPress={() => {}}>
                  <InfoText
                    color="black"
                    size={25}
                    fontFamily="NotoSansKR-Bold">
                    홈
                  </InfoText>
                </RoundRectangleButton>
                <Space width={10} />
                <RoundRectangleButton onPress={() => {}}>
                  <InfoText
                    color="black"
                    size={25}
                    fontFamily="NotoSansKR-Bold">
                    시작
                  </InfoText>
                </RoundRectangleButton>
                <Space width={20} />
              </FlexHorizontal>
            </SubContentContainer>
            <Space height={20} />
          </ContentContainer>
        </AnimatedBox>
      </Modal>
    );
  }
}

export default EndGameInfo;
