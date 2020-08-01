import React from 'react'
import {View, Text, ViewProps} from 'react-native';
import styled from 'styled-components';

const TouchAgentContainer: typeof View = styled(View)`
  opacity: 0;
  position: absolute;
`;

const TouchAgent: React.FC<ViewProps> = (props) => {
  return <TouchAgentContainer {...props} />;
};

export default TouchAgent;
