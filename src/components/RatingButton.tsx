import React, { Fragment } from 'react'
import { View, Text, Linking, Alert, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components'
import { getIcon } from '../api/icon'
import { FlexHorizontal, NotoSans, Space } from './Generic/StyledComponents';

const StarContainer: typeof View = styled(View)`
  padding: 3px;
  background-color: rgba(0,0,0,0.2);
  border-width: 1px;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  flex-direction: row;
  border-color: rgba(0,0,0,0.5);
`;

const RatingButton = () => {
  const onPress = ()=>{
    if (Platform.OS !== 'ios') {
      Linking.openURL(`market://details?id=com.sortio`).catch(err =>
        Alert.alert('Please check for the Google Play Store')
      );      
    } else {
      // Linking.openURL(
      //   `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`
      // ).catch(err => alert('Please check for the App Store'));    
    }
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <FlexHorizontal>
        <StarContainer>
          {getIcon("fontAwesome", "arrow-right", {
            color: "yellow",
            size: 15,
          })}
          <Space width={5}/>
          <NotoSans color="white" type="Black">
            별점주기
          </NotoSans>
          <Space width={5}/>
        </StarContainer>
      </FlexHorizontal>
    </TouchableOpacity>
  )
}

export default RatingButton
