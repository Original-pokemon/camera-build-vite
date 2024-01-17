import { AppRoute } from '../const/app-route';

export type AppRouteType = typeof AppRoute[keyof typeof AppRoute];
