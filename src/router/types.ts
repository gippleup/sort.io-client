import { StackHeaderProps, StackNavigationOptions } from "@react-navigation/stack";
import { cardTransitions } from "./cardTransition";

export type Routes<ParamList> = {
  [T in keyof ParamList]: {
    devName: string;
    component: React.FunctionComponent<any> | React.ComponentClass<any, any> | React.FC<any>;
    type?: 'dev' | 'production';
    headerShown?: boolean;
    header?: React.FunctionComponent<StackHeaderProps>;
    options?: StackNavigationOptions;
    invisibleOnDev?: boolean;
  };
};

export const CommonPopupOption: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  headerShown: false,
  cardStyleInterpolator: cardTransitions.forFade,
}