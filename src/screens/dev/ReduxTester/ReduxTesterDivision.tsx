import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components';
import { NotoSans } from '@components/Generic/StyledComponents';

const ContentContainer: typeof View = styled(View)`
  padding: 15px;
  background-color: white;
  border-radius: 10px;
  border-width: 1px;
  margin-horizontal: 15px;
`;

type ReduxTesterDivisionProps = {
  title: string;
  
}

const ReduxTesterDivision: React.FC<ReduxTesterDivisionProps> = (props) => {
  const { title } = props;
  return (
    <View>
      <NotoSans style={{ margin: 10 }} size={20} type="Black">
        ■ {title}
      </NotoSans>
      <ContentContainer>
        {props.children}
      </ContentContainer>
    </View>
  )
}

export default ReduxTesterDivision
