export const SortDirection = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const Sort = {
  Price: 'price',
  Popularity: 'popularity',
} as const;


export const FilterParamName = {
  Category: 'category',
  CameraType: 'type',
  Level: 'level',
} as const;

export const MIN_PRICE_NAME = 'price_min';
export const MAX_PRICE_NAME = 'price_max';
