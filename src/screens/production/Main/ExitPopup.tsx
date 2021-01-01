import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, Dimensions, BackHandler } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components'
import { modifyToTargetRoutes, removeTargetRoute } from '@api/navigation';
import { FlexHorizontal, NotoSans, Space, WindowSizeView } from '@components/Generic/StyledComponents'
import StrokedText from '@components/StrokedText';
import useGlobal from '@hooks/useGlobal';
import { RootStackParamList } from '@router/routes';
import { getRandomQuestionSet } from './ExitPopup/utils';
import BuildConfig from 'react-native-config';

const {BUILD_ENV} = BuildConfig;

const Container = styled(WindowSizeView)`
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.7);
`;

const Content = styled(NotoSans)`
  max-width: 300px;
  background-color: white;
  padding: 20px;
  border-width: 1px;
  border-radius: 10px;
`;

const Button: typeof NotoSans = styled(NotoSans)`
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-width: 1px;
  border-radius: 10px;
  color: white;
`;

const ExitPopup = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const {language: lan} = useGlobal();
  const questionSet = getRandomQuestionSet(lan);

  const exitGame = () => {
    if (BUILD_ENV === "DEV") {
      modifyToTargetRoutes(navigation, [
        {name: "Developer"},
      ])
    } else {
      BackHandler.exitApp();
    }
  }
  const cancelExit = () => removeTargetRoute(navigation, "Popup_Exit");

  return (
    <Container>
      <StrokedText
        dyMultiplier={0.4}
        fillColor="white"
        fontFamily="NotoSansKR-Black"
        fontSize={30}
        height={40}
        strokeColor="black"
        strokeWidth={3}
        text={questionSet.title}
        width={Dimensions.get('window').width}
        // test
      />
      <Space height={10} />
      <Content type="Bold">{questionSet.content}</Content>
      <Space height={10} />
      <FlexHorizontal>
        <TouchableOpacity onPress={cancelExit}>
          <Button style={{backgroundColor: 'dodgerblue'}} size={20} type="Bold">
            {questionSet.cancel}
          </Button>
        </TouchableOpacity>
        <Space width={10} />
        <TouchableOpacity onPress={exitGame}>
          <Button style={{backgroundColor: 'grey'}} size={20} type="Bold">
            {questionSet.exit}
          </Button>
        </TouchableOpacity>
      </FlexHorizontal>
    </Container>
  )
}

export default ExitPopup
