import React, { Fragment } from 'react';
import {View, Text} from 'react-native';
import styled, {css} from 'styled-components';
import routes from './routes';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import BuildConfig from 'react-native-config';
import { modifyToTargetRoutes } from '@api/navigation';

const {BUILD_ENV} = BuildConfig;

const DeveloperContainer = styled(ScrollView)``;

type NavButtonContainerProps = {
  important: boolean;
};

const NavButtonContainer = styled(TouchableOpacity)`
  padding: 15px;
  border-bottom-width: 0.5px;
  ${(props: NavButtonContainerProps) => {
    if (props.important) {
      return css`
        background-color: brown;
        border-bottom-color: white;
      `;
    } else {
      return css`
        background-color: black;
        border-bottom-color: grey;
      `;
    }
  }}
`;

const NavButtonText = styled(Text)`
  color: white;
`;

type DevNavButtonProps = {
  devName: string;
  routeName: string;
  type?: 'dev' | 'production';
};
const DevNavButton = (props: DevNavButtonProps) => {
  const navigation = useNavigation();
  return (
    <NavButtonContainer
      important={props.type === 'production'}
      onPress={() => {
        console.log(`clicked ${props.routeName} at ${Date.now()}`);
        if (BUILD_ENV === "DEV" && props.routeName === "Main") {
          modifyToTargetRoutes(navigation, [
            {name: "Developer"},
            {name: "LoadingScreen"},
            {name: "Main"},
          ])
        } else {
          navigation.navigate(props.routeName)
        }
      }}>
      <NavButtonText>{props.devName}</NavButtonText>
    </NavButtonContainer>
  );
};

const Developer = () => {
  return (
    <DeveloperContainer>
      {Object.entries(routes).map(([routeName, options]) => {
        if (options.invisibleOnDev) {
          return <Fragment key={options.devName}></Fragment>
        }
        return (
          <DevNavButton
            type={options.type}
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
