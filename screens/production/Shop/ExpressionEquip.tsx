import { CommonActions, RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import chroma from 'chroma-js'
import React from 'react'
import { View, Text, Dimensions, GestureResponderEvent } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Svg, { Circle, G, Path } from 'react-native-svg'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ExpressionEquipWheel from '../../../components/ExpressionEquipWheel'
import PatternBackground from '../../../components/GameScene/PatternBackground'
import { NotoSans, Space } from '../../../components/Generic/StyledComponents'
import GradientBlindScrollView from '../../../components/GradientBlindScrollView'
import NativeRefBox from '../../../components/NativeRefBox'
import Profile from '../../../components/Profile'
import expressions, { SupportedExpression } from '../../../components/Profile/Expressions'
import usePlayData from '../../../hooks/usePlayData'
import { AppState } from '../../../redux/store'
import { RootStackParamList } from '../../../router/routes'

const backgroundImage = require('../../../assets/BackgroundPattern.png');

export type ExpressionEquipParams = {
}

type ExpressionEquipProps = {
  navigation: StackNavigationProp<RootStackParamList, "ExpressionEquip">;
  route: RouteProp<RootStackParamList, "ExpressionEquip">;
}

const ExpressionContainer: typeof NativeRefBox = styled(NativeRefBox)`
  width: 80px;
  height: 80px;
  border-color: dodgerblue;
  background-color: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-width: 2px;
`;

const ExpressionEquip = (props: ExpressionEquipProps) => {
  const state = useSelector((state: AppState) => state);
  const {global, items, playData} = state;
  const {user} = playData;
  const navigation = useNavigation();
  const ownedExpressions = items
    .filter((item) => item.category === "expression" && item.hasOwned)
    .map((item) => ({...item, ref: React.useRef<NativeRefBox>(null)}));

  const isSelecting = React.useRef(false);

  const expressionContainerSize = 80;
  const marginBetweenContainer = 15;
  const expressionListTitleHeight = 50.28;
  const guideTextHeight = 22.85;
  const sizeConsideringMargin = expressionContainerSize + marginBetweenContainer;
  const scrollViewWidth = Dimensions.get('screen').width;
  const scrollViewHeight = Dimensions.get('screen').height * (4 / 10) - expressionListTitleHeight;
  const expectedColumn = Math.floor(
    (scrollViewWidth - marginBetweenContainer)
    / (sizeConsideringMargin)
  );
  const expectedRow = Math.floor(
    (scrollViewHeight - marginBetweenContainer)
    / (sizeConsideringMargin)
  );
  const requiredWidth = expectedColumn * (sizeConsideringMargin) + marginBetweenContainer;
  const requiredHeight = expectedRow * (sizeConsideringMargin) + marginBetweenContainer;

  const onPressComplete = () => {
    navigation.dispatch((state) => {
      const routes = state.routes.filter((route) => route.name !== "ExpressionEquip")
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      })
    })    
  }

  return (
    <View style={{flex: 1}}>
      <PatternBackground source={backgroundImage} />
      <View style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View style={{backgroundColor: 'black', width: '100%', alignItems: 'center'}}>
          <Space height={10} />
          <NotoSans color="white" size={20} type="Black">사용 가능 표현</NotoSans>
          <Space height={10} />
        </View>
        <GradientBlindScrollView
          blindColor="black"
          style={{ height: scrollViewHeight, width: Dimensions.get('screen').width }}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: "wrap",
            justifyContent: 'center',
            marginLeft: marginBetweenContainer,
            marginTop: marginBetweenContainer,
            paddingBottom: 50,
          }}
        >
          {ownedExpressions.map((expression, i) => {
            const {name, ref} = expression;

            const onTouchContainer = () => {
              isSelecting.current = true;
              ownedExpressions.forEach((expression) => {
                expression.ref.current?.stopAnimation();
                expression.ref.current?.setStyle({ backgroundColor: 'rgba(0,0,0,0.5)' });
              })              
              ref.current?.animate({
                style: {
                  backgroundColor: 'dodgerblue',
                },
                duration: 100,
                easing: "easeInOutSine",
              }).start();
            }

            return (
              <ExpressionContainer
                style={{
                  marginBottom: marginBetweenContainer,
                  marginRight: marginBetweenContainer,
                }}
                key={i}
                ref={ref}
                onStartShouldSetResponder={() => true}
                onResponderRelease={onTouchContainer}
              >
                {expressions[name as SupportedExpression](true)}
              </ExpressionContainer>
            )
          })}
        </GradientBlindScrollView>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            padding: 10,
            backgroundColor: 'goldenrod',
            borderRadius: 300,
            borderWidth: 3,
            borderColor: chroma('goldenrod').darken().darken().hex(),
          }}
        >
          <ExpressionEquipWheel
            size={Math.min(
              Dimensions.get('screen').height
                * (6 / 10)
                - expressionListTitleHeight
                - guideTextHeight
                - 120,
              Dimensions.get('screen').width
                - 100
            )}
          />
        </View>
        <Space height={20} />
        <TouchableOpacity onPress={onPressComplete}>
          <NotoSans
            style={{
              padding: 5,
              paddingHorizontal: 10,
              backgroundColor: 'dodgerblue',
              borderRadius: 5,
            }}
            size={25}
            color="white"
            type="Black"
          >
            적용 완료
          </NotoSans>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ExpressionEquip
