import React from 'react'
import { View, Dimensions, Text } from 'react-native'
import PatternBackground from '../../components/GameScene/PatternBackground'
import SelectStageHeader from './SelectStage/SelectStageHeader';
import styled, { css } from 'styled-components';
import { FlexHorizontal, Space } from '../../components/Generic/StyledComponents';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const backgroundImage = require('../../assets/BackgroundPattern.png');

const RecordTitle = styled(Text)`
  color: white;
  font-family: NotoSansKR-Bold;
  font-size: 15px;
`;

type CustomTextProps = {
  small?: boolean;
  extrasmall?: boolean;
  dark?: boolean;
  large?: boolean;
}

const CustomText = styled(Text)<CustomTextProps>`
  color: ${(props) => props.dark ? 'black' : 'white'};
  font-family: NotoSansKR-Bold;
  ${(props) => {
    if (props.small) {
      return css`
        font-size: 15px;
        line-height: 20px;
      `;
    } else if (props.extrasmall) {
      return css`
        font-size: 12px;
        line-height: 17px;
      `;
    } else if (props.large) {
      return css`
        font-size: 30px;
        line-height: 40px;
      `;
    } else {
      return css`
        font-size: 25px;
        line-height: 33px;
      `;
    }
  }}
`;


type CustomTextContainerProps = {
  fit?: boolean;
  dark?: boolean;
  wide?: boolean;
  border?: boolean;
  full?: boolean;
};

const CustomTextContainer = styled(FlexHorizontal)<CustomTextContainerProps>`
  padding: 15px;
  background-color: ${(props) => props.dark ? 'rgba(0,0,0,0.3)' : 'white'};
  border-radius: 30px;
  ${(props) => {
    if (props.wide) {
      return css`
        width: ${Dimensions.get('screen').width - 60}px;
      `;
    } else if (props.full) {
      return css`
        width: 100%;
      `
    }
  }}
  ${(props) => {
    if (!props.fit) {
      return css`
        padding-left: 30px;
        padding-right: 30px;
      `;
    } else {
      return css`
        padding: 10px;
        border-radius: 15px;
      `;
    }
  }}
  align-items: center;
  justify-content: center;
  border-width: ${(props) => props.border ? '3px' : '0px'};
`;

const RecordEntryContainer = styled(View)`
  align-items: center;
`;

const GraphIcon: typeof SLIcon = styled(SLIcon)`
  font-size: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 20px;
  color: dodgerblue;
`

const GraphButton: typeof TouchableOpacity = styled(TouchableOpacity)`
  margin-left: 10px;
`;

const Division = styled(View)`
  align-items: center;
`;

const TicketIcon = (props: {small?: boolean, hasBackground?: boolean}) => (
  <View
    style={{
      padding: props.small ? 6 : 10,
      borderRadius: 50,
      backgroundColor: props.hasBackground ? 'black' : 'transparent',
    }}>
    <View>
      <FAIcon
        style={{
          position: 'absolute',
          left: 1,
          top: 1
        }}
        name="ticket"
        size={props.small ? 20 : 30}
        color="dodgerblue"
        />
      <FAIcon
        name="ticket"
        size={props.small ? 20 : 30}
        color="yellow"
      />
    </View>
  </View>
)

const SelectStage = () => {
  const navigation = useNavigation();
  return (
    <View>
      <PatternBackground
        source={backgroundImage}
        width={Dimensions.get('screen').width}
        height={Dimensions.get('screen').height}
        scale={0.5}
      />
      <ScrollView>
        
        <SelectStageHeader />
        <Division>
          <RecordEntryContainer>
            <RecordTitle>현재 기록</RecordTitle>
            <FlexHorizontal>
              <CustomTextContainer dark>
                <CustomText>하드 7-2</CustomText>
                <CustomText small> (20초)</CustomText>
              </CustomTextContainer>
              <GraphButton>
                <GraphIcon name="graph"/>
              </GraphButton>
            </FlexHorizontal>
          </RecordEntryContainer>
          <RecordEntryContainer>
            <RecordTitle>싱글 플레이 순위</RecordTitle>
            <FlexHorizontal>
              <CustomTextContainer dark>
                <CustomText>124561위</CustomText>
                <CustomText small> (15.8%)</CustomText>
              </CustomTextContainer>
              <GraphButton>
                <GraphIcon name="graph" />
              </GraphButton>
            </FlexHorizontal>
          </RecordEntryContainer>
        </Division>
        <Space height={100} />
        <Division>
          <View style={{width: Dimensions.get('screen').width - 100}}>
            <FlexHorizontal style={{alignSelf:'flex-end'}}>
              <TicketIcon small/>
              <CustomTextContainer dark fit>
                <CustomText small>999</CustomText>
              </CustomTextContainer>
              <Space width={10} />
              <TouchableOpacity>
                <CustomTextContainer fit>
                  <CustomText dark small>티켓 구매</CustomText>
                </CustomTextContainer>
              </TouchableOpacity>
            </FlexHorizontal>
            <Space height={10} />
            <TouchableOpacity onPress={() => navigation.navigate('PD_GameScene', {
                mode: 'single',
                subType: 'challenge',
                level: 0,
              })}>
              <CustomTextContainer border full>
                <TicketIcon hasBackground/>
                <Space width={10} />
                <CustomText large dark>챌린지</CustomText>
              </CustomTextContainer>
            </TouchableOpacity>
            <Space height={10} />
            <TouchableOpacity onPress={() => navigation.navigate('PD_GameScene', {
                mode: 'single',
                subType: 'training',
                level: 0,
              })}>
              <CustomTextContainer border full>
                <CustomText large dark>연습하기</CustomText>
              </CustomTextContainer>
            </TouchableOpacity>
          </View>
        </Division>
      </ScrollView>
    </View>
  )
}

export default SelectStage
