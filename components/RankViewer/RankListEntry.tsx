import React from 'react';
import {View, Text, Image} from 'react-native';
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
};

const defaultProfile = require('../../assets/default-profile.png');

const RankListEntry = (props: RankListEntryProps) => {
  const {rank, rate, username, profilePic} = props.data;
  const profile = profilePic || defaultProfile;
  const prettyRate = `(${prettyPercent(rate)}%)`;
  return (
    <EntryContainer>
      <FlexHorizontal>
        <ProfilePic source={profile} />
        <UserInfoContainer>
          <Text>{username}</Text>
          <FlexHorizontal>
            <RankText>{rank + '위'}</RankText>
            <RankRateText>{prettyRate}</RankRateText>
          </FlexHorizontal>
        </UserInfoContainer>
      </FlexHorizontal>
    </EntryContainer>
  );
};

export default RankListEntry;
