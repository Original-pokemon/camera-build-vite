import { Sort, SortDirection } from './const';

export type SortType = typeof Sort[keyof typeof Sort];
export type SortDirectionType = typeof SortDirection[keyof typeof SortDirection];
