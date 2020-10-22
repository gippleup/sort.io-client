import Developer from './Developer';
import { devParams, devRoutes } from './DevRoutes';
import { pdRoutes, pdParams } from './ProductionRoutes';
import { Routes } from './types';

const routes: Routes<Omit<RootStackParamList, "Developer">> = {
  ...devRoutes,
  ...pdRoutes,
};

export type RootStackParamList = devParams & pdParams;

export default routes;
