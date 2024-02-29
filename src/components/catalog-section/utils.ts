import { Camera, CameraCategory, CameraLevel, Filter } from '../../const';
import { ProductType } from '../../types';
import { Sort, SortDirection } from './const';
import { CameraType, CategoryType, LevelType, SortDirectionType, SortType } from './types';

export const isSortType = (string: string | null): string is SortType => (string === Sort.Popularity || string === Sort.Price);
export const isDirectionType = (string: string | null): string is SortDirectionType => (string === SortDirection.ASC || string === SortDirection.DESC);

export const isCategoryType = (string: string | null): string is CategoryType => Object.values(Filter.Category).some((value) => value === string);
export const isCameraType = (string: string | null): string is CameraType => Object.values(Filter.CameraType).some((value) => value === string);
export const isLevelType = (string: string | null): string is LevelType => Object.values(Filter.Level).some((value) => value === string);


const sortByType = (products: ProductType[], sortType: SortType, direction: SortDirectionType): ProductType[] => products.slice().sort((a, b) => {
  const productProperty = sortType === Sort.Popularity ? 'rating' : 'price';

  if (direction === SortDirection.ASC) {
    return a[productProperty] - b[productProperty];
  } else {
    return b[productProperty] - a[productProperty];
  }
});


type FilterProps = {
  cameraType: CameraType | null;
  category: CategoryType | null;
  level: LevelType | null;
}

export const filterByValue = (products: ProductType[], filter: FilterProps) => products.filter((product) => {
  if (filter.category && product.category !== CameraCategory[filter.category]) {
    return false;
  }
  if (filter.cameraType && product.type !== Camera[filter.cameraType]) {
    return false;
  }
  if (filter.level && product.level !== CameraLevel[filter.level]) {
    return false;
  }
  return true;
});

type GetVisibleProductsProps = {
  products: ProductType[];
  pagination: {
    startIndex: number;
    endIndex: number;
  };
  sort: {
    sortType: SortType | null;
    sortDirection: SortDirectionType | null;
  };
}

export const getVisibleProducts = ({ products, pagination, sort }: GetVisibleProductsProps) => {
  const { startIndex, endIndex } = pagination;
  const { sortType, sortDirection } = sort;

  if (sortType && sortDirection) {
    const sortedProducts = sortByType(products, sortType, sortDirection);

    return sortedProducts.slice(startIndex, endIndex);
  }

  return products.slice(startIndex, endIndex);
};
