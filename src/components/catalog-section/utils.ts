import { Camera, CameraCategory, CameraLevel, Filter } from '../../const';
import { ProductType } from '../../types';
import { Sort, SortDirection } from './const';
import { CameraType, CategoryType, LevelType, SortDirectionType, SortType } from './types';

export const isSortType = (string: string | null): string is SortType => (string === Sort.Popularity || string === Sort.Price);
export const isDirectionType = (string: string | null): string is SortDirectionType => (string === SortDirection.ASC || string === SortDirection.DESC);

export const isCategoryType = (string: string | null): string is CategoryType => Object.values(Filter.Category).some((value) => value === string);
export const isCameraType = (string: string | null): string is CameraType => Object.values(Filter.CameraType).some((value) => value === string);
export const isLevelType = (string: string | null): string is LevelType => Object.values(Filter.Level).some((value) => value === string);

type SortByTypeProps = {
  products: ProductType[];
  sortType: SortType | null;
  sortDirection: SortDirectionType | null;
}

export const sortByType = ({ products, sortType, sortDirection }: SortByTypeProps): ProductType[] => {
  if (sortType && sortDirection) {
    const sortedProducts = products.slice().sort((a, b) => {
      const productProperty = sortType === Sort.Popularity ? 'rating' : 'price';

      if (sortDirection === SortDirection.ASC) {
        return a[productProperty] - b[productProperty];
      } else {
        return b[productProperty] - a[productProperty];
      }

    });

    return sortedProducts;
  }
  return products;
};
type FilterProps = {
  price: {
    min: number | null;
    max: number | null;
  };
  cameraType: CameraType | null;
  category: CategoryType | null;
  level: LevelType | null;
}

export const filterByValue = (products: ProductType[], filter: FilterProps) => {
  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  const filteredProducts = products.filter((product) => {
    if (filter.category && product.category !== CameraCategory[filter.category]) {
      return false;
    }
    if (filter.cameraType && product.type !== Camera[filter.cameraType]) {
      return false;
    }
    if (filter.level && product.level !== CameraLevel[filter.level]) {
      return false;
    }

    if (!minPrice) {
      minPrice = product.price;
    }

    if (!maxPrice) {
      maxPrice = product.price;
    }

    if (maxPrice < product.price) {
      maxPrice = product.price;
    }

    if (minPrice > product.price) {
      minPrice = product.price;
    }

    if (filter.price.min && product.price < filter.price.min) {
      return false;
    }
    if (filter.price.max && product.price > filter.price.max) {
      return false;
    }

    return true;
  });

  return {
    filteredProducts,
    minPrice: minPrice ?? 0,
    maxPrice: maxPrice ?? 0,
  };
};

type GetVisibleProductsProps = {
  products: ProductType[];
  pagination: {
    startIndex: number;
    endIndex: number;
  };
}

export const getVisibleProducts = ({ products, pagination }: GetVisibleProductsProps) => {
  const { startIndex, endIndex } = pagination;

  return products.slice(startIndex, endIndex);
};
