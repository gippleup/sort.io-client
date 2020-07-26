import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import routes from './routes';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const DeveloperContainer = styled(ScrollView)``;

const NavButtonContainer = styled(TouchableOpacity)`
  background-color: black;
  padding: 15px;
  border-bottom-width: 0.5px;
  border-bottom-color: grey;
`;

const NavButtonText = styled(Text)`
  color: white;
`;

type DevNavButtonProps = {
  devName: string;
  routeName: string;
};
const DevNavButton = (props: DevNavButtonProps) => {
  const navigation = useNavigation();
  return (
    <NavButtonContainer onPress={() => navigation.navigate(props.routeName)}>
      <NavButtonText>{props.devName}</NavButtonText>
    </NavButtonContainer>
  );
};

const Developer = () => {
  return (
    <DeveloperContainer>
      {Object.entries(routes).map(([routeName, options]) => {
        return (
          <DevNavButton
            key={options.devName}
            routeName={routeName}
            devName={options.devName}
          />
        );
      })}
    </DeveloperContainer>
  );
};

export default Developer;
