import React from 'react';
import {View, Text, Image, ViewStyle, TextStyle, LayoutChangeEvent} from 'react-native';
import {prettyPercent} from '../EndGameInfo/utils';
import {FlexHorizontal} from '../Generic/StyledComponents';
import {
  EntryContainer,
  ProfilePic,
  UserInfoContainer,
  RankRateText,
  RankText,
} from './_StyledComponents';

type RankListEntryData = {
  name: string;
  rank: number;
  rate: number;
  photo?: string;
};

type RankListEntryProps = {
  data: RankListEntryData;
  style?: ViewStyle;
  usernameStyle?: TextStyle;
  rankTextStyle?: TextStyle;
  rankRateStyle?: TextStyle;
  textStyle?: TextStyle;
  onLayout?: (e: LayoutChangeEvent) => any;
};

const defaultProfile = require('../../assets/default-profile.png');

const RankListEntry = (props: RankListEntryProps) => {
  const {data, style} = props;
  console.log(data);
  const {rank, rate, name, photo} = data;
  const profile = {uri: photo} || defaultProfile;
  const prettyRate = `(상위 ${prettyPercent(rate)}%)`;
  return (
    <EntryContainer onLayout={props.onLayout} style={style}>
      <FlexHorizontal>
        <ProfilePic source={profile} />
        <UserInfoContainer>
          <Text style={{
            ...props.textStyle,
            ...props.usernameStyle
          }}>{name}</Text>
          <FlexHorizontal>
            <RankText style={{
              ...props.textStyle,
              ...props.rankTextStyle
            }}>{rank + '위'}</RankText>
            <RankRateText style={{
              ...props.textStyle,
              ...props.rankRateStyle
            }}>{prettyRate}</RankRateText>
          </FlexHorizontal>
        </UserInfoContainer>
      </FlexHorizontal>
    </EntryContainer>
  );
};

export default RankListEntry;
