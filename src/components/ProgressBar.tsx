import React from 'react'
import { View, Text, Dimensions, ViewProps } from 'react-native'
import styled from 'styled-components'
import { prettyPercent } from './EndGameInfo/utils';

const Container: typeof View = styled(View)`
  align-items: center;
  justify-content: center;
`;

const ProgressShell: typeof View = styled(View)`
  width: ${Dimensions.get('window').width - 200}px;
  max-width: 200px;
  min-width: 100px;
  height: 10px;
  background-color: grey;
  border-width: 1px;
  border-radius: 10px;
`;

const ProgressText: typeof Text = styled(Text)`
  color: white;
  font-size: 10px;
  margin-top: 3px;
`;

type ProgressFillProps = {
  rate: number;
}

const ProgressFill: React.ComponentClass<ViewProps & ProgressFillProps> = styled(View)<ViewProps & ProgressFillProps>`
  width: ${(props) => `${props.rate * 100}%`};
  max-width: 100%;
  min-width: 0%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
`;

type ProgressBarProps = {
  rate: number;
}

const ProgressBar = (props: ProgressBarProps) => {
  const {rate} = props;
  return (
    <Container>
      <ProgressShell>
        <ProgressFill rate={rate} />
      </ProgressShell>
      <ProgressText>{prettyPercent(rate)}%</ProgressText>
    </Container>
  )
}

export default ProgressBar
