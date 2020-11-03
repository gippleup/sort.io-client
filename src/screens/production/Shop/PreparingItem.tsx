import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { FullFlexCenter, NotoSans } from '../../../components/Generic/StyledComponents';
import useGlobal from '../../../hooks/useGlobal';
import TranslationPack from '../../../Language/translation';

const Container: typeof View = styled(View)`
  background-color: tomato;
  margin: 40px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border-width: 1px;
`;

const PreparingItem = () => {
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.Shop;
  return (
    <FullFlexCenter>
      <Container>
        <NotoSans size={25} color="white" type="Black">
          {translation.noItems}
        </NotoSans>
      </Container>
    </FullFlexCenter>
  )
}

export default PreparingItem
