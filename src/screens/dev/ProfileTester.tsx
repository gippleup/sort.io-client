import React from 'react'
import { View, Text } from 'react-native'
import Profile from '../../components/Profile'
import expressions from '../../components/Profile/Expressions';

const ProfileTester = () => {
  const profileRef = React.createRef<Profile>();

  React.useEffect(() => {
    const interval = setInterval(() => {
      profileRef.current?.express(
        expressions.tired,
        "bottomLeft",
        50
      )
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  })

  return (
    <View style={{width: 200, height: 200, justifyContent: 'center', alignItems: 'center'}}>
      <Profile ref={profileRef} chatBubbleSize={60} size={50} />
    </View>
  )
}

export default ProfileTester
