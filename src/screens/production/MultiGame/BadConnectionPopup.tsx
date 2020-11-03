import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, BackHandler } from 'react-native'
import styled from 'styled-components'
import { remainTargetRoutes } from '../../../api/navigation';
import Flickery from '../../../components/Flickery';
import { NotoSans } from '../../../components/Generic/StyledComponents';
import useGlobal from '../../../hooks/useGlobal';
import TranslationPack from '../../../Language/translation';
import routes, { RootStackParamList } from '../../../router/routes';

const Container: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.5);
`;

const Popup: typeof View = styled(View)`
  max-width: 300px;
  background-color: tomato;
  padding: 20px;
  border-radius: 20px;
  border-width: 1px;
`;

const BadConnectionPopup = () => {
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.MultiPlay;
  const flickeryRef = React.useRef<Flickery>(null);
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const blockGoBack = () => true;

  BackHandler.addEventListener("hardwareBackPress", blockGoBack);

  React.useEffect(() => {
    flickeryRef.current?.flickerNTimes(3);
    const timeout = setTimeout(() => remainTargetRoutes(navigation, ["Main"]), 1500);

    return () => {
      clearTimeout(timeout);
      BackHandler.removeEventListener("hardwareBackPress", blockGoBack);
    }
  })

  return (
    <Container>
      <Flickery ref={flickeryRef}>
        <Popup>
          <NotoSans size={20} color="white" type="Black">
            {translation.badConnection}
          </NotoSans>
        </Popup>
      </Flickery>
    </Container>
  )
}

export default BadConnectionPopup
