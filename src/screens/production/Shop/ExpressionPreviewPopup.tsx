import { CommonActions, NavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components'
import { removeTargetRoute } from '@api/navigation'
import { getExpressionSoundEffect } from '@assets/sounds/expressionSound'
import { NotoSans, RoundPaddingCenter, Space } from '@components/Generic/StyledComponents'
import Profile from '@components/Profile'
import expressions, { SupportedExpression } from '@components/Profile/Expressions'
import { RootStackParamList } from '@router/routes'

export type ExpressionPreviewPopupParams = {
  expression: SupportedExpression;
}

const ProfileContainer: typeof View = styled(View)`
  background-color: black;
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border-width: 5px;
  border-color: grey;
  flex-direction: row;
`;

type ExpressionPreviewPopupProps = {
  navigation: StackNavigationProp<RootStackParamList, "Popup_ExpressionPreview">,
  route: RouteProp<RootStackParamList, "Popup_ExpressionPreview">,
}

const ExpressionPreviewPopup = (props: ExpressionPreviewPopupProps) => {
  const { expression } = props.route.params;
  const profileRef = React.createRef<Profile>();
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const onPressClose = () => removeTargetRoute(navigation, "Popup_ExpressionPreview")

  React.useEffect(() => {
    const interval = setInterval(() => {
      profileRef.current?.express(expression, "bottomLeft", 50)
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  })

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ProfileContainer>
        <Profile ref={profileRef} chatBubbleSize={60} size={50} />
      </ProfileContainer>
      <Space height={10} />
      <TouchableOpacity onPress={onPressClose}>
        <RoundPaddingCenter>
          <NotoSans size={20} type="Bold">
            닫기
          </NotoSans>
        </RoundPaddingCenter>
      </TouchableOpacity>
    </View>
  )
}

export default ExpressionPreviewPopup
