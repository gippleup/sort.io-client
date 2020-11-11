import React from 'react'
import { View, Text, Share, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components'
import { getIcon } from '../api/icon'

const url: {[T in typeof Platform.OS]?: string} = {
  android: "https://play.google.com/store/apps/details?id=com.sortio",
};

const ShareIconContainer = styled(View)`
  width: 30px;
  height: 30px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: rgba(0,0,0,0.5);
`;

const ShareButton = () => {
  const shareUrl = url[Platform.OS];

  if (shareUrl === undefined) return <></>;

  const onPress = async () => {
    try {
      const result = await Share.share({
        message: shareUrl,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  
  return (
    <TouchableOpacity onPress={onPress}>
      <ShareIconContainer>
        {getIcon("fontAwesome", "share-alt", {
          color: "white",
          size: 15
        })}
      </ShareIconContainer>
  </TouchableOpacity>
)
}

export default ShareButton
