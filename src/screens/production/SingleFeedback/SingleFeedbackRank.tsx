import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { getSinglePlayRankById, RawSingleRankData } from '../../../api/rank';
import { FlexHorizontal, NotoSans } from '../../../components/Generic/StyledComponents'
import useGlobal from '../../../hooks/useGlobal';
import usePlayData from '../../../hooks/usePlayData';
import TranslationPack from '../../../Language/translation';
const dimension = Dimensions.get("window");
const SingleFeedbackRank = () => {
  const {user} = usePlayData();
  const [data, setData] = React.useState<RawSingleRankData | null>();
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.SingleFeedback;
  if (data === undefined) {
    getSinglePlayRankById(user.id, 7)
    .then((data) => data ? setData(data) : setData(null))
    return (
      <NotoSans color="white" size={20}>LOADING</NotoSans>
    )
  } else if (data === null) {
    return (
      <View
        style={{
          width: Dimensions.get("window").width - 100,
          height: 100,
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NotoSans color="white" size={20}>NOT ENOUGH DATA</NotoSans>
      </View>
    )
  }

  const estimatedTotal = Math.ceil(1 / Number(data.rate) * Number(data.rank));

  return (
    <FlexHorizontal style={{width: dimension.width - 100}}>
      <NotoSans color="white" size={50}>{translation.rankText(Number(data.rank))}</NotoSans>
      <View style={{marginLeft: 5, width: dimension.width - 100 - 80}}>
        <NotoSans color="white" type="Light">{translation.rankDeclaration(Number(data.rank), estimatedTotal)}</NotoSans>
        <NotoSans color="white" type="Thin">({translation.forLast7Days})</NotoSans>
      </View>
    </FlexHorizontal>
  )
}

export default SingleFeedbackRank
