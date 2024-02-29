import { Filter } from '../../const';
import { Sort, SortDirection } from './const';

export type SortType = typeof Sort[keyof typeof Sort];
export type SortDirectionType = typeof SortDirection[keyof typeof SortDirection];

export type CategoryType = typeof Filter.Category[keyof typeof Filter.Category];
export type CameraType = typeof Filter.CameraType[keyof typeof Filter.CameraType];
export type LevelType = typeof Filter.Level[keyof typeof Filter.Level];
