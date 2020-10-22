import React from 'react'
import { View, Text, Alert } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { makeGuestId } from '../../api/sortio'
import { FlexHorizontal, NotoSans, RoundPaddingCenter, Space } from '../../components/Generic/StyledComponents'
import TreeViewer from '../../components/TreeViewer'
import { RootState } from '../../redux/reducers'
import ReduxActionButton from './ReduxTester/ReduxActionButton'
import ReduxTesterDivision from './ReduxTester/ReduxTesterDivision'

const ReduxTester = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <ReduxTesterDivision title="리덕스 스테이트">
        <TreeViewer data={state} />
      </ReduxTesterDivision>
      <ReduxTesterDivision title="리덕스 사용 상황 가정">
        <NotoSans size={20} type="Bold">로그인 관련</NotoSans>
        <ReduxActionButton
          text="최초 로그인"
          description="게스트 아이디 생성 및 로컬 스토리지에 저장"
        />
        <ReduxActionButton
          text="구글 로그인"
          description="게스트 아이디에 구글 아이디 부여 / 서버에 존재하는 구글 아이디 조회하여 불러오기"
        />
        <ReduxActionButton text="구글 로그아웃" description="로컬 스토리지 초기화 및 새로운 게스트 아이디 부여" />
        <ReduxActionButton text="_초기화" description="로컬 스토리지에 저장된 유저 아이디 삭제" />
        <Space height={20} />
        <NotoSans size={20} type="Bold">경기 관련</NotoSans>
        <ReduxActionButton text="싱글게임 승리" description="로컬 스토리지에 저장된 유저 아이디 조회하여 해당 아이디로 서버에 결과 저장" />
        <ReduxActionButton text="싱글게임 패배" description="이하 동문" />
        <ReduxActionButton text="멀티게임 승리" description="딱히 할 것 없음. 소켓에서 처리될 것" />
        <ReduxActionButton text="멀티게임 패배" description="이하 동문" />
        <Space height={20} />
        <NotoSans size={20} type="Bold">골드 Fetching 관련</NotoSans>
        <ReduxActionButton text="메인화면 접속" description="로컬 스토리지에 저장된 유저 아이디로 해당 유저의 닉네임과 골드를 확인하여 스테이트 업데이트" />
        <ReduxActionButton text="싱글 게임 선택 화면 접속" description="로컬 스토리지에 저장된 유저 아이디로 해당 유저의 싱글 게임 기록 및 골드 불러와서 스테이트 업데이트" />
        <ReduxActionButton text="상점 방문" description="로컬 스토리지에 저장된 유저 아이디로 골드 및 아이템 현황 불러와서 스테이트 업데이트" />
        <Space height={20} />
        <NotoSans size={20} type="Bold">아이템 구매 관련</NotoSans>
        <ReduxActionButton text="아이템 구매" description="로컬 스토리지에 저장된 유저 아이디로 아이템 구매 요청 => 서버에서 골드 확인하여 구매 요청 승인/기각" />
        <ReduxActionButton text="티켓 구매" description="로컬 스토리지에 저장된 유저 아이디로 티켓 구매 요청 => 서버에서 골드 확인하여 구매 요청 승인/기각" />
        <ReduxActionButton text="골드 충전 아이템 구매" description="로컬 스토리지에 저장된 유저 아이디로 티켓 구매 요청 => IAP 요청 결과에 따라 서버에서 승인/기각" />
        <Space height={20} />
        <NotoSans size={20} type="Bold">아이템 착용 관련</NotoSans>
        <ReduxActionButton text="스킨 착용" description="로컬 스토리지에 저장된 유저 아이디로 해당 스킨에 대한 보유 여부 판별하는 요청 => 서버에서 확인 => 확인될 경우 글로벌 스테이트 업데이트(skin: '')" />
        <ReduxActionButton text="표현 착용" description="위랑 같은 로직" />
        <ReduxActionButton text="배경 변경" description="위랑 같은 로직" />
      </ReduxTesterDivision>
      <Space height={200} />
    </ScrollView>
  )
}

export default ReduxTester
