import React, { Fragment } from 'react'
import { View } from 'react-native'
import Logo from '@components/Logo'
import MoneyIndicator from '@components/Main/MoneyIndicator'
import MainButton from '@components/Main/MainButton'
import PatternBackground from '@components/GameScene/PatternBackground'
import Icon from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components'
import { RouteProp } from '@react-navigation/native'
import { FlexHorizontal, Space, NotoSans, Line } from '@components/Generic/StyledComponents'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlayData, loadPlayData } from '@redux/actions/playData/thunk'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@router/routes'
import AnimationController from '@components/AnimationController'
import GoogleSigninController from '@components/GoogleSigninController'
import { useNetInfo } from '@react-native-community/netinfo'
import { isServerAlive } from '@api/sortio'
import AdmobBanner from '@components/AdmobBaner'
import BuildConfig from 'react-native-config'
import { AppState } from '@redux/store'
import TranslationPack from '@Language/translation'
import { modifyToTargetRoutes } from '@api/navigation'
import RatingButton from '@components/RatingButton'
import ShareButton from '@components/ShareButton'
import codePush from 'react-native-code-push';
import { trackSys, trackUser } from '@api/analytics'

const {BUILD_ENV} = BuildConfig;

const backgroundImage = require('@assets/BackgroundPattern.png');

const ButtonIcon: typeof Icon = styled(Icon)`
  position: absolute;
  left: 20px;
  font-size: 30px;
`;

const BannerAdSpace: typeof View = styled(View)`
  flex: 1;
  margin-top: 10px;
  transform: scale(0.8);
`;

type MainNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>
type MainRouteProp = RouteProp<RootStackParamList, 'Main'>

type MainProps = {
  navigation: MainNavigationProp;
  route: MainRouteProp;
}

const Main = (props: MainProps) => {
  const navigation = props.navigation;
  const {playData, global} = useSelector((state: AppState) => state);
  const loadedPlayData = React.useRef(false);
  const {language: lan} = global;
  const translation = TranslationPack[lan].screens.Main;
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const [serverStatus, setServerStatus] = React.useState<"dead" | "alive">("dead");
  const [bannerAdSpace, setBannerAdSpace] = React.useState<{width: number; height: number;} | undefined>();
  const checkedUpdate = React.useRef(false);
  let focusTimeout: NodeJS.Timeout;

  if (!checkedUpdate.current) {
    trackUser("Came to Main");
    checkedUpdate.current = true;
    codePush.checkForUpdate()
    .then((avilableUpdate) => {
      trackSys("Checked available update");
      if (!avilableUpdate) return;
      trackSys("Codepush sync started");
      codePush.sync();
    })
    .catch((e) => {
      console.log(e);
    })
  }

  if (!playData.loaded && !loadedPlayData.current) {
    loadedPlayData.current = true;
    dispatch(loadPlayData());
  }

  let unsubscribeBeforeRemove: null | (() => void) = null;
  
  const configureBeforeRemove = () => {
    if (unsubscribeBeforeRemove !== null) return;
    unsubscribeBeforeRemove = navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.type === "GO_BACK") {
        e.preventDefault();
      }
      // if (BUILD_ENV === "DEV") return false;
      if (isConnectionOk) {
        navigation.navigate("Popup_Exit");
        return true;
      } else {
        return false;
      }
    })
  }

  const removeBeforeRemove = () => {
    if (unsubscribeBeforeRemove) {
      unsubscribeBeforeRemove();
      unsubscribeBeforeRemove = null;
    }
  }

  const onFoucus = () => {
    configureBeforeRemove();
    focusTimeout = setTimeout(() => {
      isServerAlive().then((isAlive) => {
        if (isAlive) {
          setServerStatus("alive");
          dispatch(fetchPlayData());
        } else {
          setServerStatus("dead")
        }
      })
    }, 1000)
  };

  const onBlur = () => {
    removeBeforeRemove();
    if (focusTimeout !== undefined) {
      clearTimeout(focusTimeout);
    }
  }

  const onPressSingle = () => {
    trackUser("User pressed single play button");
    removeBeforeRemove();
    modifyToTargetRoutes(navigation, [
      {name: "LoadingScreen"},
      {name: "Main", onDemand: true},
      {name: "SelectStage"},
    ])
  }
  const onPressMulti = () => {
    trackUser("User pressed multi play button");
    navigation.navigate('Popup_MultiWaiting');
  }
  const onPressShop = () => {
    trackUser("User pressed shop button");
    removeBeforeRemove();
    modifyToTargetRoutes(navigation, [
      {name: "LoadingScreen"},
      {name: "Main", onDemand: true},
      {name: "Shop"},
    ])
  }
  const onPressLeaderBoard = () => {
    trackUser("User pressed leaderboard button");
    removeBeforeRemove();
    modifyToTargetRoutes(navigation, [
      {name: "LoadingScreen"},
      {name: "Main", onDemand: true},
      {name: "LeaderBoard"},
    ])
  }

  const onPressBannerAds = () => {
    trackUser("User pressed banner ads");
  }

  const SubTitle = () => {
    if (!netInfo.isConnected) {
      return (
        <NotoSans
          color="tomato"
          type="Black"
          style={{backgroundColor: 'white', borderRadius: 5, paddingHorizontal: 10}}
        >
          {translation.pleaseCheckConnection}
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
          {translation.checkingServer}
        </NotoSans>
      )
    }

    if (!playData.user) return <></>;

    return (
      <Fragment>
        <NotoSans type="Bold" color="yellow">{translation.greeting} </NotoSans>
        <NotoSans type="Black" color="white">{playData.user.name}</NotoSans>        
      </Fragment>
    )
  }

  React.useEffect(() => {
    configureBeforeRemove();
    const unsubscribeFocus = navigation.addListener("focus", onFoucus);
    const unsubscribeBlur = navigation.addListener("blur", onBlur);
    return () => {
      removeBeforeRemove();
      unsubscribeFocus();
      unsubscribeBlur();
    }
  })

  const isConnectionOk = netInfo.isConnected && serverStatus === "alive";
  const gold = (playData.loaded && playData.user) ? playData.user.gold : 0;

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
      <View style={{ position: 'absolute', right: 10, top: 10, alignItems: "flex-end" }}>
        <MoneyIndicator value={gold} />
        <View style={{marginTop: 10, flexDirection: "row", alignItems: "center"}}>
          <ShareButton/>
          <Space width={15} />
          <RatingButton/>
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: 120, marginBottom: 40}}>
        <Logo lan={lan} fontSize={40} strokeWidth={2} color="white" strokeColor="rgba(0,0,0,0.2)" />
        <FlexHorizontal>
          <SubTitle/>
        </FlexHorizontal>
      </View>
      <View style={{alignItems: 'center'}}>
        <MainButton
          preComponent={<ButtonIcon name="gamepad" color="tomato" />}
          text={translation.singlePlay}
          onPress={onPressSingle}
          impossible={!isConnectionOk}
        />
        <MainButton
          preComponent={<ButtonIcon name="users" color="mediumseagreen" />}
          text={translation.multiPlay}
          onPress={onPressMulti}
          impossible={!isConnectionOk}
        />
        <MainButton
          preComponent={<ButtonIcon name="shopping-basket" color="cornflowerblue" />}
          text={translation.shop}
          onPress={onPressShop}
          impossible={!isConnectionOk}
        />
        <MainButton
          preComponent={<ButtonIcon name="trophy" color="goldenrod" />}
          text={translation.leaderBoard}
          onPress={onPressLeaderBoard}
          impossible={!isConnectionOk}
        />
      </View>
      <BannerAdSpace
        onStartShouldSetResponder={() => true}
        onResponderGrant={onPressBannerAds}
        style={{display: isConnectionOk ? "flex" : "none"}}
        onLayout={(e) => setBannerAdSpace(e.nativeEvent.layout)}
      >
        <AdmobBanner availableSpace={bannerAdSpace} />
      </BannerAdSpace>
    </View>
  )
}

export default Main
