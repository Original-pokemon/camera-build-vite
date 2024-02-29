import { Sort, SortDirection } from './const';
import { SortDirectionType, SortType } from './types';

export const isSortType = (string: string | null): string is SortType => (string === Sort.Popularity || string === Sort.Price);
export const isDirectionType = (string: string | null): string is SortDirectionType => (string === SortDirection.ASC || string === SortDirection.DESC);
