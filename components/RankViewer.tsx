import React from 'react';
import {View, Text, ViewStyle, ScrollView, TextStyle} from 'react-native';
import RankListEntry from './RankViewer/RankListEntry';

export type RankViewerDataEntry = { username: string; userId?: number; rank: number; rate: number };
export type RankViewerData = RankViewerDataEntry[];

const defaulEmphaisStyle: ViewStyle = {
  backgroundColor: 'gold',
}

type RankViewrProps = {
  borderWidth?: number;
  data: RankViewerData;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  entryStyle?: (entry: RankViewerDataEntry, i: number, isEnd: boolean) => {
    usernameStyle?: TextStyle;
    rankTextStyle?: TextStyle;
    rankRateStyle?: TextStyle;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
  };
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
          width: '100%',
          borderTopWidth: props.borderWidth,
          borderBottomWidth: props.borderWidth,
          borderColor: props.style?.borderColor,
          alignItems: 'center',
        }}>
        <ScrollView
          ref={_scrollViewRef}
          contentContainerStyle={props.contentContainerStyle}
          style={{
            ...props.style,
            borderLeftWidth: props.borderWidth,
            borderRightWidth: props.borderWidth,
          }}>
          {props.data.map((rankListEntryData, i) => {
            let style;
            const isEnd = i === props.data.length - 1;

            if (props.entryStyle) {
              style = props.entryStyle(rankListEntryData, i, isEnd);
            }

            return (
              <RankListEntry
                key={rankListEntryData.rank}
                data={rankListEntryData}
                style={style?.containerStyle}
                usernameStyle={style?.usernameStyle}
                rankRateStyle={style?.rankRateStyle}
                rankTextStyle={style?.rankTextStyle}
                textStyle={style?.textStyle}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default RankViewer;
