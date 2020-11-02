import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, BackHandler } from 'react-native'
import styled from 'styled-components'
import Flickery from '../../../components/Flickery';
import { NotoSans } from '../../../components/Generic/StyledComponents';
import routes from '../../../router/routes';

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
  const flickeryRef = React.useRef<Flickery>(null);
  const navigation = useNavigation();

  const blockGoBack = () => true;

  BackHandler.addEventListener("hardwareBackPress", blockGoBack);

  React.useEffect(() => {
    flickeryRef.current?.flickerNTimes(3);
    const timeout = setTimeout(() => {
      navigation.dispatch((state) => {
        const routes = state.routes.filter((route) => route.name === "Main");
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        })
      })
    }, 1500);

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
            연결 상태가 좋지 않아 게임이 종료되었습니다.
          </NotoSans>
        </Popup>
      </Flickery>
    </Container>
  )
}

export default BadConnectionPopup
