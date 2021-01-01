import React from 'react'
import { View, Text } from 'react-native'
import CountryFlagIcon from '@components/CountryFlagIcon'

const CountryFlagIconTester = () => {
  return (
    <View>
      <CountryFlagIcon lat={30} lng={60} />
    </View>
  )
}

export default CountryFlagIconTester
