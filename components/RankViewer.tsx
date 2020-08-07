import React from 'react';
import {View, Text, ViewStyle, ScrollView} from 'react-native';
import RankListEntry from './RankViewer/RankListEntry';

const fakeRankList = [
  {
    username: '백만송이',
    rank: 14523,
    rate: 0.125,
  },
  {
    username: '천만송이',
    rank: 14524,
    rate: 0.125,
  },
  {
    username: '화산송이',
    rank: 14525,
    rate: 0.126,
  },
  {
    username: '버섯송이',
    rank: 14526,
    rate: 0.126,
  },
  {
    username: '표고송이',
    rank: 14527,
    rate: 0.126,
  },
  {
    username: '미친송이',
    rank: 14528,
    rate: 0.126,
  },
];

type RankViewrProps = {
  style?: ViewStyle;
  borderWidth?: number;
};

class RankViewer extends React.Component<RankViewrProps> {
  _scrollViewRef = React.createRef<ScrollView>();
  constructor(props: Readonly<RankViewrProps>) {
    super(props);
  }

  render() {
    const {props} = this;
    const {_scrollViewRef} = this;
    return (
      <View
        style={{
          borderTopWidth: props.borderWidth,
          borderBottomWidth: props.borderWidth,
          width: props.style?.width,
          borderColor: props.style?.borderColor,
        }}>
        <ScrollView
          ref={_scrollViewRef}
          style={{
            ...props.style,
            borderLeftWidth: props.borderWidth,
            borderRightWidth: props.borderWidth,
          }}>
          {fakeRankList.map((rankListEntryData) => {
            return (
              <RankListEntry
                key={rankListEntryData.rank}
                data={rankListEntryData}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default RankViewer;
