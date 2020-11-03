import { CommonActions, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../router/routes";

type SortIoNavigation = NavigationProp<RootStackParamList>;
type RouteName = keyof RootStackParamList;

export const removeTargetRoute = (navigation: SortIoNavigation, target: RouteName) => {
  navigation.dispatch((state) => {
    const routes = state.routes.filter((route) => route.name !== target);
    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    })
  })
}

export const remainTargetRoutes = (navigation: SortIoNavigation, targets: RouteName[]) => {
  const isOneOfTarget = (routeName: string) => {
    return targets.indexOf(routeName as RouteName) !== -1;
  }

  navigation.dispatch((state) => {
    const routes = state.routes.filter((route) => isOneOfTarget(route.name));
    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    })
  })
}

type ModifyOption = {
  name: RouteName,
  params?: any,
  renew?: boolean,
}

export const modifyToTargetRoutes = (navigation: SortIoNavigation, options: ModifyOption[]) => {
  navigation.dispatch((state) => {
    const existingRoutes = state.routes.map((route) => route.name);
    const routes = options.map((option) => {
      const alreadyOnState = existingRoutes.indexOf(option.name) !== -1;
      const existingRoute = state.routes.filter((route) => route.name === option.name)[0];
      if (!alreadyOnState || option.renew) {
        return {
          key: option.name + Date.now(),
          name: option.name,
          params: option.params,
        };
      } else {
        return existingRoute;
      }
    });
  
    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    })
  })
}