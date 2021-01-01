import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getIcon } from '@api/icon';
import { modifyToTargetRoutes } from '@api/navigation';
import PatternBackground from '@components/GameScene/PatternBackground'
import TranslationPack from '@Language/translation';
import { AppState } from '@redux/store';
import { RootStackParamList } from '@router/routes';
import SingleFeedbackGraph from '@screens/production/SingleFeedback/SingleFeedbackGraph';
import SingleFeedbackRank from '@screens/production/SingleFeedback/SingleFeedbackRank';
import SingleFeedbackStage from '@screens/production/SingleFeedback/SingleFeedbackStage';

const backgroundImage = require('@assets/BackgroundPattern.png');

const BackButtonContainer = styled(View)`
  width: 100px;
  background-color: dodgerblue;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
`

type SingleFeedbackProps = {
  navigation: StackNavigationProp<RootStackParamList, "SingleFeedback">;
  route: RouteProp<RootStackParamList, "SingleFeedback">;
}

export type SingleFeedbackParams = {
  level: number;
}

const SingleFeedback = (props: SingleFeedbackProps) => {
  const {global, items, playData} = useSelector((state: AppState) => state)
  const navigation = useNavigation();
  const {language: lan} = global;
  const {singlePlay} = playData;
  const lastPlay = singlePlay[singlePlay.length - 1];
  const translation = TranslationPack[lan].screens.SelectStage;

  const goBack = () => {
    modifyToTargetRoutes(navigation, [
      {name: "LoadingScreen"},
      {name: "Main", onDemand: true},
      {name: "SelectStage"},
    ])
  }

  return (
    <View style={{flex: 1, alignItems: "center"}}>
      <PatternBackground source={backgroundImage} />
      <View style={{alignItems: "center", justifyContent: "space-around", flex: 1}}>
        <SingleFeedbackGraph/>
        <SingleFeedbackRank/>
        <SingleFeedbackStage/>
      </View>
      <View style={{marginBottom: 30, marginTop: 10}}>
        <TouchableOpacity onPress={goBack}>
          <BackButtonContainer>
            {getIcon("fontAwesome", "arrow-left", {
              size: 40,
              color: "white",
            })}
          </BackButtonContainer>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SingleFeedback
