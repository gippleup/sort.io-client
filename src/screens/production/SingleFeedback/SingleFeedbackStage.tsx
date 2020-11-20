import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { SinglePlay } from '../../../api/playData'
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
  const lastPlay: SinglePlay = singlePlay[singlePlay.length - 1] || {
    createdAt: Date.now(),
    difficulty: 0,
    id: 0,
    userId: playData.user.id
  };
  const translation = TranslationPack[lan].screens.SingleFeedback;
  const totalStage = getTotalLevel();
  const stageProgress = prettyPercent(lastPlay.difficulty / totalStage);
  const stageFeedback = getStageFeedback(lastPlay.difficulty, lan);

  return (
    <View style={{marginHorizontal: 30}}>
      <NotoSans color="white" type="Black" size={40}>{getLevelString(lastPlay.difficulty)}</NotoSans>
      <NotoSans color="white" type="Light" size={12}>{translation.stageClearDeclaration(lastPlay.difficulty || 0)}</NotoSans>
      <NotoSans color="white" size={20}>{stageFeedback}</NotoSans>
    </View>
  )
}

export default SingleFeedbackStage
