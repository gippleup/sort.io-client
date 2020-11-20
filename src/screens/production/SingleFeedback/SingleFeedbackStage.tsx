import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { prettyPercent } from '../../../api/utils'
import { FlexHorizontal, NotoSans } from '../../../components/Generic/StyledComponents'
import TimerBar from '../../../components/TimerBar'
import TranslationPack from '../../../Language/translation'
import { AppState } from '../../../redux/store'
import { getLevelString, getTotalLevel } from '../GameScreen/utils'
import { getStageFeedback } from './utils'

const SingleFeedbackStage = () => {
  const {global, items, playData} = useSelector((state: AppState) => state)
  const {language: lan} = global;
  const {singlePlay} = playData;
  const lastPlay = singlePlay[singlePlay.length - 1];
  const translation = TranslationPack[lan].screens.SelectStage;
  const totalStage = getTotalLevel();
  const stageProgress = prettyPercent(lastPlay.difficulty / totalStage);
  const stageFeedback = getStageFeedback(lastPlay.difficulty, lan);

  return (
    <View style={{marginHorizontal: 50}}>
      <NotoSans color="white" type="Black" size={40}>{getLevelString(lastPlay.difficulty)}</NotoSans>
      <NotoSans color="white" type="Light" size={15}>You've cleared {lastPlay.difficulty}th stage of {totalStage} stages.</NotoSans>
      <NotoSans color="white" size={20}>{stageFeedback}</NotoSans>
    </View>
  )
}

export default SingleFeedbackStage
