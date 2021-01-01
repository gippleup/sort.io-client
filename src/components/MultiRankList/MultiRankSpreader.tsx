import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { RawMultiRankData } from '@api/rank'
import Spreader from '@components/Spreader'
import MultiRankDescription from './MultiRankDescription'

const SpreaderContentContainer = styled(View)`
  background-color: black;
  padding-bottom: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  border-width: 1px;
  border-color: blue;
`;

type MultiRankSpreaderProps = {
  visible?: boolean;
  userData: RawMultiRankData;
}

const MultiRankSpreader = (props: MultiRankSpreaderProps) => {
  const {visible, userData} = props;
  const spreaderRef = React.useRef<Spreader>(null);

  React.useEffect(() => {
    if (visible) {
      spreaderRef.current?.setSpread("unfold");
    }
    if (!visible) {
      spreaderRef.current?.setSpread("fold");
    }  
  })

  if (!userData) return <></>;

  return (
    <Spreader
      foldDuration={300}
      ref={spreaderRef}
    >
      <SpreaderContentContainer>
        {/* <MultiRankGraph graphData={graphData} /> */}
        <MultiRankDescription data={userData} />
      </SpreaderContentContainer>
    </Spreader>
  )
}

export default MultiRankSpreader
