import styled from 'styled-components';
import {View, Image, Text} from 'react-native';

export const EntryContainer: typeof View = styled(View)`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.2);
  background-color: dodgerblue;
`;

export const ProfilePic: typeof Image = styled(Image)`
  border-radius: 24px;
  width: 48px;
  height: 48px;
`;

export const UserInfoContainer: typeof View = styled(View)`
  padding: 5px;
  padding-left: 10px;
  justify-content: space-between;
`;

export const RankRateText: typeof Text = styled(Text)`
  font-size: 10px;
  height: 100%;
  text-align-vertical: bottom;
`;

export const RankText: typeof Text = styled(Text)`
  font-size: 12px;
  font-weight: bold;
`;