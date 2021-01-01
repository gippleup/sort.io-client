import { CommonActions, NavigationContainerRef, NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@router/routes";

type RouteName = keyof RootStackParamList;
type SortIoNavigation = NavigationProp<RootStackParamList, RouteName> | NavigationProp<any>;

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

export type ModifyOption = {
  name: RouteName,
  params?: any,
  renew?: boolean,
  onDemand?: boolean,
  LoadingText?: string,
}

let routeId = 0;

export const modifyToTargetRoutes = (navigation: SortIoNavigation | NavigationContainerRef, options: ModifyOption[]) => {
  navigation.dispatch((state) => {
    const existingRoutes = state.routes.map((route) => route.name);
    const routes = options.map((option) => {
      const alreadyOnState = existingRoutes.indexOf(option.name) !== -1;
      const existingRoute = state.routes.filter((route) => route.name === option.name)[0];
      routeId += 1;
      if (option.onDemand) {
        return {
          key: "LoadingScreen" + routeId,
          name: "LoadingScreen",
          params: {
            navigateTo: option.name,
            params: option.params,
            text: option.LoadingText,
          },
        };
      } else if (!alreadyOnState || option.renew) {
        return {
          key: option.name + routeId,
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

export const slimNavigate = (navigation: SortIoNavigation | NavigationContainerRef, name: RouteName, params?: any, loadingText?: string) => {
  navigation.dispatch((state) => {
    const curRoute = state.routes[state.index];
    let routes: typeof state.routes = state.routes
      .map((route) => {
        if (route === curRoute) {
          routeId += 1;
          return {
            key: "LoadingScreen" + routeId,
            name: "LoadingScreen",
            params: {
              navigateTo: curRoute.name,
              params: curRoute.params,
              text: loadingText,
            },
          }
        }
        return route;
      })
    routeId += 1;
    routes = routes.concat({
      name,
      key: name + routeId,
      params,
    });

    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    })
  })
}