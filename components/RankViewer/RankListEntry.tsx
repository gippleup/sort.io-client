import React from 'react';
import {View, Text, Image, ViewStyle, TextStyle} from 'react-native';
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
  username: string;
  rank: number;
  rate: number;
  profilePic?: string;
};

type RankListEntryProps = {
  data: RankListEntryData;
  style?: ViewStyle;
  usernameStyle?: TextStyle;
  rankTextStyle?: TextStyle;
  rankRateStyle?: TextStyle;
  textStyle?: TextStyle;
};

const defaultProfile = require('../../assets/default-profile.png');

const RankListEntry = (props: RankListEntryProps) => {
  const {data, style} = props;
  const {rank, rate, username, profilePic} = data;
  const profile = profilePic || defaultProfile;
  const prettyRate = `(${prettyPercent(rate)}%)`;
  return (
    <EntryContainer style={style}>
      <FlexHorizontal>
        <ProfilePic source={profile} />
        <UserInfoContainer>
          <Text style={{
            ...props.textStyle,
            ...props.usernameStyle
          }}>{username}</Text>
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
