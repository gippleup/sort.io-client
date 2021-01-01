import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import useGlobal from '@hooks/useGlobal';
import TranslationPack from '@Language/translation';
import { NotoSans } from '@components/Generic/StyledComponents'

const TextContainer: typeof View = styled(View)`
  background-color: darkgoldenrod;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  border-width: 1px;
`;

const RewardGuide = () => {
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.SelectStage;
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <TextContainer>
        <NotoSans color="white" type="Thin">
          {translation.adAdvert}
        </NotoSans>
      </TextContainer>
    </View>
  )
}

export default RewardGuide
