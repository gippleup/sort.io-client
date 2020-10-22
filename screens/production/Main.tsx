import React, { Fragment } from 'react'
import { View, Dimensions } from 'react-native'
import Logo from '../../components/Logo'
import VolumeControl from '../../components/Main/VolumeControl'
import MoneyIndicator from '../../components/Main/MoneyIndicator'
import MainButton from '../../components/Main/MainButton'
import PatternBackground from '../../components/GameScene/PatternBackground'
import Icon from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components'
import { useNavigation, RouteProp, CommonActions } from '@react-navigation/native'
import usePlayData from '../../hooks/usePlayData'
import { FlexHorizontal, Space, NotoSans, Line } from '../../components/Generic/StyledComponents'
import { useDispatch } from 'react-redux'
import { loadPlayData, signInWithGoogle, signOutWithGoogle } from '../../redux/actions/playData/thunk'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../router/routes'
import AnimationController from '../../components/AnimationController'
import GoogleSigninController from '../../components/GoogleSigninController'
import { useNetInfo } from '@react-native-community/netinfo'
import { isServerAlive } from '../../api/sortio'

const backgroundImage = require('../../assets/BackgroundPattern.png');

const ButtonIcon: typeof Icon = styled(Icon)`
  position: absolute;
  left: 20px;
  font-size: 30px;
`;

type MainNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>
type MainRouteProp = RouteProp<RootStackParamList, 'Main'>

type MainProps = {
  navigation: MainNavigationProp;
  route: MainRouteProp;
}

const Main = (props: MainProps) => {
  const navigation = props.navigation;
  const playData = usePlayData();
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const [serverStatus, setServerStatus] = React.useState<"dead" | "alive">("dead");

  if (!playData.loaded) {
    dispatch(loadPlayData());
  }

  const onPressSingle = () => navigation.navigate('SelectStage');
  const onPressMulti = () => navigation.navigate('Popup_MultiWaiting');
  const onPressShop = () => navigation.navigate("Shop");
  const onPressLeaderBoard = () => navigation.navigate("LeaderBoard");

  const SubTitle = () => {
    if (!netInfo.isConnected) {
      return (
        <NotoSans
          color="tomato"
          type="Black"
          style={{backgroundColor: 'white', borderRadius: 5, paddingHorizontal: 10}}
        >
          인터넷 연결상태를 확인해주세요.
        </NotoSans>
      )
    }

    if (serverStatus === "dead") {
      return (
        <NotoSans
          color="mediumseagreen"
          type="Black"
          style={{backgroundColor: 'white', borderRadius: 5, paddingHorizontal: 10}}
        >
          서버를 점검하고 있습니다.
        </NotoSans>
      )
    }

    return (
      <Fragment>
        <NotoSans type="Bold" color="yellow">Welcome! </NotoSans>
        <NotoSans type="Black" color="white">{playData.user.name}</NotoSans>        
      </Fragment>
    )
  }

  React.useEffect(() => {
    isServerAlive().then(() => {
      setServerStatus("alive");
    })
  })

  const isConnectionOk = netInfo.isConnected && serverStatus === "alive";

  return (
    <View style={{flex: 1, backgroundColor: 'grey'}}>
      <PatternBackground source={backgroundImage}/>
      <View style={{position: 'absolute', left: 10, top: 10}}>
        <FlexHorizontal>
          <AnimationController/>
          <Line width={0.5} height='80%' marginHorizontal={10} color="rgba(255,255,255,0.5)" />
          <GoogleSigninController/>
        </FlexHorizontal>
      </View>
      <View style={{ position: 'absolute', right: 10, top: 10 }}>
        <MoneyIndicator value={playData.loaded ? playData?.user.gold : 0} />
      </View>
      <View style={{alignItems: 'center', marginTop: 120, marginBottom: 40}}>
        <Logo fontSize={60} strokeWidth={2} color="white" strokeColor="rgba(0,0,0,0.2)" />
        <FlexHorizontal>
          <SubTitle/>
        </FlexHorizontal>
      </View>
      <View style={{alignItems: 'center'}}>
        <MainButton
          preComponent={<ButtonIcon name="gamepad" color="tomato" />}
          text="싱글 플레이"
          onPress={onPressSingle}
          impossible={!isConnectionOk}
        />
        <MainButton
          preComponent={<ButtonIcon name="users" color="mediumseagreen" />}
          text="멀티 플레이"
          onPress={onPressMulti}
          impossible={!isConnectionOk}
        />
        <MainButton
          preComponent={<ButtonIcon name="shopping-basket" color="cornflowerblue" />}
          text="상점"
          onPress={onPressShop}
          impossible={!isConnectionOk}
        />
        <MainButton
          preComponent={<ButtonIcon name="trophy" color="goldenrod" />}
          text="리더보드"
          onPress={onPressLeaderBoard}
          impossible={!isConnectionOk}
        />
      </View>
    </View>
  )
}

export default Main
