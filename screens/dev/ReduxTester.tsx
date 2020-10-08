import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import TreeViewer from '../../components/TreeViewer'
import { RootState } from '../../redux/reducers'

const ReduxTester = () => {
  const state = useSelector((state: RootState) => state);
  return (
    <View>
      <TreeViewer data={state} />
    </View>
  )
}

export default ReduxTester
