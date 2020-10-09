import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { FlexHorizontal, NotoSans, RoundPaddingCenter, Space } from '../../components/Generic/StyledComponents'
import TreeViewer from '../../components/TreeViewer'
import { RootState } from '../../redux/reducers'
import ReduxActionButton from './ReduxTester/ReduxActionButton'
import ReduxTesterDivision from './ReduxTester/ReduxTesterDivision'


const ReduxTester = () => {
  const state = useSelector((state: RootState) => state);
  return (
    <ScrollView>
      <ReduxTesterDivision title="리덕스 스테이트">
        <TreeViewer data={state} />
      </ReduxTesterDivision>
      <ReduxTesterDivision title="리덕스 사용 상황 가정">
        <NotoSans size={20} type="Bold">로그인 관련</NotoSans>
        <ReduxActionButton text="_초기화"/>
        <ReduxActionButton text="최초 로그인"/>
        <ReduxActionButton text="구글 로그인"/>
        <ReduxActionButton text="구글 로그아웃"/>
        <Space height={20} />
        <NotoSans size={20} type="Bold">경기 관련</NotoSans>
        <ReduxActionButton text="싱글게임 승리"/>
        <ReduxActionButton text="싱글게임 패배"/>
        <ReduxActionButton text="멀티게임 승리"/>
        <ReduxActionButton text="멀티게임 패배"/>
        <Space height={20} />
        <NotoSans size={20} type="Bold">골드 Fetching 관련</NotoSans>
        <ReduxActionButton text="메인화면 접속"/>
        <ReduxActionButton text="싱글 게임 선택 화면 접속"/>
        <ReduxActionButton text="상점 방문"/>
        <Space height={20} />
        <NotoSans size={20} type="Bold">아이템 구매 관련</NotoSans>
        <ReduxActionButton text="아이템 구매"/>
        <ReduxActionButton text="티켓 구매" />
        <ReduxActionButton text="골드 충전 아이템 구매"/>
        <Space height={20} />
        <NotoSans size={20} type="Bold">아이템 착용 관련</NotoSans>
        <ReduxActionButton text="스킨 착용"/>
        <ReduxActionButton text="표현 착용"/>
        <ReduxActionButton text="배경 변경"/>
      </ReduxTesterDivision>
      <Space height={200} />
    </ScrollView>
  )
}

export default ReduxTester
