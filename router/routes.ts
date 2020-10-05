import { devParams, devRoutes } from './DevRoutes';
import { pdRoutes, pdParams } from './ProductionRoutes';
import { Routes } from './types';

const routes: Routes<RootStackParamList> = {
  ...devRoutes,
  ...pdRoutes,
};

export type RootStackParamList = Omit<devParams, "Developer"> & pdParams;

export default routes;
