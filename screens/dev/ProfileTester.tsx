import React from 'react'
import { View, Text } from 'react-native'
import Profile from '../../components/Profile'

const ProfileTester = () => {
  const profileRef = React.createRef<Profile>();

  React.useEffect(() => {
    profileRef.current?.express(
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: 'blue',
          borderRadius: 100,
        }}
      >
      </View>,
      // <></>,
      "topRight",
      50
    )
  })

  return (
    <View style={{width: 200, height: 200, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: 40, height: 40, borderWidth: 1, borderRadius: 100}}>
        <Profile ref={profileRef} />
      </View>
    </View>
  )
}

export default ProfileTester
