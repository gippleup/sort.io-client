import React from 'react';
import {View, Text, Image, ViewStyle, TextStyle, LayoutChangeEvent} from 'react-native';
import TranslationPack from '../../Language/translation';
import { SupportedLanguage } from '../../redux/actions/global/types';
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
  lan?: SupportedLanguage;
};

const defaultProfile = require('../../assets/default-profile.png');

const RankListEntry = (props: RankListEntryProps) => {
  const {data, style, lan = SupportedLanguage.en} = props;
  const translation = TranslationPack[lan].screens.LeaderBoard;
  const {rank, rate, name, photo} = data;
  const profile = photo ? {uri: photo} : defaultProfile;
  const prettyRate = `(${translation.top} ${prettyPercent(rate)}%)`;
  return (
    <EntryContainer onLayout={props.onLayout} style={style}>
      <FlexHorizontal>
        <ProfilePic source={profile} />
        <UserInfoContainer>
          <Text
            style={{
            ...props.textStyle,
            ...props.usernameStyle
            }}
          >
            {name}
          </Text>
          <FlexHorizontal>
            <RankText
              style={{
              ...props.textStyle,
              ...props.rankTextStyle
              }}
            >
              {translation.rankText(Number(rank)) + " "}
            </RankText>
            <RankRateText
              style={{
              ...props.textStyle,
              ...props.rankRateStyle
              }}
            >
              {prettyRate}
            </RankRateText>
          </FlexHorizontal>
        </UserInfoContainer>
      </FlexHorizontal>
    </EntryContainer>
  );
};

export default RankListEntry;
