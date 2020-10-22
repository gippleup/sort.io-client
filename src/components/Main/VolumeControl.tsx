import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { FlexHorizontal } from '../Generic/StyledComponents';

const IconContainer = styled(View)`
  padding: 15px;
  border-radius: 50px;
  background-color: midnightblue;
  border-color: lightgrey;
  /* border-width: 2px; */
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const VolumeControl = () => {
  const [muted, setMuted] = React.useState(false);
  return (
    <FlexHorizontal>
      <TouchableOpacity onPress={() => setMuted(!muted)}>
        <IconContainer>
          <Icon name={muted ? 'volume-off' : 'volume-up'} size={20} color="white" />
        </IconContainer>
      </TouchableOpacity>
    </FlexHorizontal>
  )
}

export default VolumeControl
