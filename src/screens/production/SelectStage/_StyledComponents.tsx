import {Text, View, Dimensions} from 'react-native';
import styled, { css } from 'styled-components';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { FlexHorizontal } from '../../../components/Generic/StyledComponents';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';

export const RecordTitle = styled(Text)`
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

export const CustomText = styled(Text) <CustomTextProps>`
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

export const CustomTextContainer = styled(FlexHorizontal) <CustomTextContainerProps>`
  padding: 15px;
  background-color: ${(props) => props.dark ? 'rgba(0,0,0,0.3)' : 'white'};
  border-radius: 30px;
  ${(props) => {
    if (props.wide) {
      return css`
        width: ${Dimensions.get('window').width - 60}px;
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

export const RecordEntryContainer = styled(View)`
  align-items: center;
`;

export const PaddedSLIcon: typeof SLIcon = styled(SLIcon)`
  font-size: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 20px;
  color: dodgerblue;
`

export const GraphButton: typeof TouchableOpacity = styled(TouchableOpacity)`
  margin-left: 10px;
`;

export const Division = styled(View)`
  align-items: center;
`;

export const TicketIcon = (props: { small?: boolean, hasBackground?: boolean }) => (
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

export const AskPopupContentContainer = styled(View)`
  max-width: ${Dimensions.get('window').width - 100}px;
`;