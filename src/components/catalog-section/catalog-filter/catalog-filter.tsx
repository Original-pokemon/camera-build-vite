import { useSearchParams } from 'react-router-dom';
import CatalogFilterBlock from './catalog-filter-block/catalog-filter-block';
import FilterItem from './filter-item/filter-item';
import CustomInput from './сustom-input/custom-input';
import { Camera, CameraCategory, CameraLevel, Filter } from '../../../const';
import { FilterParamName, MAX_PRICE_NAME, MIN_PRICE_NAME } from '../const';
import { ChangeEvent } from 'react';
import { isCameraType, isCategoryType, isLevelType } from '../utils';
import { debounce } from '../../../utils/debounce';

type CatalogSortProps = {
  priceRange: { [MIN_PRICE_NAME]: number;[MAX_PRICE_NAME]: number };
  currentPrice: { [MIN_PRICE_NAME]: number | null;[MAX_PRICE_NAME]: number | null };
}

const CatalogFilter = ({ priceRange, currentPrice }: CatalogSortProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [currentPrice, setPrice] = useState<{ [key: string]: number }>({ [MIN_PRICE_NAME]: minPrice, [MAX_PRICE_NAME]: maxPrice });
  const categorySearchParam = searchParams.get(FilterParamName.Category);
  const categoryType = isCategoryType(categorySearchParam) ? categorySearchParam : null;

  const cameraTypeSearchParam = searchParams.get(FilterParamName.CameraType);
  const cameraType = isCameraType(cameraTypeSearchParam) ? cameraTypeSearchParam : null;

  const levelSearchParam = searchParams.get(FilterParamName.Level);
  const levelType = isLevelType(levelSearchParam) ? levelSearchParam : null;

  const handleCategoryChange = (event: ChangeEvent<HTMLFieldSetElement>) => {
    const { name } = event.target;
    setSearchParams((prevParams) => {
      prevParams.set(FilterParamName.Category, name);
      return prevParams;
    }
    );
  };

  const handlePriceChange = (event: ChangeEvent) => {
    if (event?.target) {
      const target = event.target as HTMLInputElement;
      const { name, value } = target;
      let price = +value;

      if (name === MIN_PRICE_NAME) {
        if (currentPrice[MAX_PRICE_NAME] && price > currentPrice[MAX_PRICE_NAME]) {
          price = currentPrice[MAX_PRICE_NAME];
        }

        if (price < priceRange[MIN_PRICE_NAME]) {
          price = priceRange[MIN_PRICE_NAME];
        }

        setSearchParams((prevParams) => {
          prevParams.set(MIN_PRICE_NAME, price.toString());

          return prevParams;
        });
      }

      if (name === MAX_PRICE_NAME) {
        if (currentPrice[MIN_PRICE_NAME] && price < currentPrice[MIN_PRICE_NAME]) {
          price = currentPrice[MIN_PRICE_NAME];
        }

        if (price > priceRange[MAX_PRICE_NAME]) {
          price = priceRange[MAX_PRICE_NAME];
        }

        setSearchParams((prevParams) => {
          prevParams.set(MAX_PRICE_NAME, price.toString());

          return prevParams;
        });
      }

      target.value = price > 0 ? price.toString() : '';
    }

  };

  const [debouncedHandlePriceChange] = debounce(handlePriceChange, 1000);

  const handleCameraTypeChange = (event: ChangeEvent<HTMLFieldSetElement>) => {
    const { name } = event.target;
    setSearchParams((prevParams) => {
      prevParams.set(FilterParamName.CameraType, name);
      return prevParams;
    }
    );
  };

  const handleLevelChange = (event: ChangeEvent<HTMLFieldSetElement>) => {
    const { name } = event.target;
    setSearchParams((prevParams) => {
      prevParams.set(FilterParamName.Level, name);
      return prevParams;
    }
    );
  };

  const handleReset = () => {
    setSearchParams((prevParams) => {
      prevParams.delete(FilterParamName.Category);
      prevParams.delete('type');
      prevParams.delete('level');
      prevParams.delete('direction');
      prevParams.delete('sortBy');
      prevParams.delete('price_max');
      prevParams.delete('price_min');
      return prevParams;
    });
  };

  return (
    <div className="catalog-filter">
      <form action="#" data-testid='form'>
        <h2 className="visually-hidden">Фильтр</h2>

        <CatalogFilterBlock legend="Цена, ₽" onChange={debouncedHandlePriceChange}>
          <div className="catalog-filter__price-range">
            <CustomInput type="number" defaultValue={currentPrice[MIN_PRICE_NAME]?.toString() || ''} name={MIN_PRICE_NAME} testId={MIN_PRICE_NAME} placeholder={priceRange[MIN_PRICE_NAME].toString()} />
            <CustomInput type="number" defaultValue={currentPrice[MAX_PRICE_NAME]?.toString() || ''} name={MAX_PRICE_NAME} testId={MAX_PRICE_NAME} placeholder={priceRange[MAX_PRICE_NAME].toString()} />
          </div>
        </CatalogFilterBlock>

        <CatalogFilterBlock legend="Категория" onChange={handleCategoryChange}>
          <FilterItem name={Filter.Category.PhotoCamera} label={CameraCategory[Filter.Category.PhotoCamera]} checked={categoryType === Filter.Category.PhotoCamera} />
          <FilterItem name={Filter.Category.VideoCamera} label={CameraCategory[Filter.Category.VideoCamera]} checked={categoryType === Filter.Category.VideoCamera} />
        </CatalogFilterBlock>

        <CatalogFilterBlock legend="Тип камеры" onChange={handleCameraTypeChange}>
          <FilterItem name={Filter.CameraType.Digital} label={Camera[Filter.CameraType.Digital]} checked={cameraType === Filter.CameraType.Digital} />
          <FilterItem name={Filter.CameraType.Film} label={Camera[Filter.CameraType.Film]} checked={cameraType === Filter.CameraType.Film} disabled={categoryType === Filter.Category.VideoCamera} />
          <FilterItem name={Filter.CameraType.Snapshot} label={Camera[Filter.CameraType.Snapshot]} checked={cameraType === Filter.CameraType.Snapshot} disabled={categoryType === Filter.Category.VideoCamera} />
          <FilterItem name={Filter.CameraType.Collection} label={Camera[Filter.CameraType.Collection]} checked={cameraType === Filter.CameraType.Collection} />
        </CatalogFilterBlock>

        <CatalogFilterBlock legend="Уровень" onChange={handleLevelChange}>
          <FilterItem name={Filter.Level.Zero} label={CameraLevel[Filter.Level.Zero]} checked={levelType === Filter.Level.Zero} />
          <FilterItem name={Filter.Level.Amateur} label={CameraLevel[Filter.Level.Amateur]} checked={levelType === Filter.Level.Amateur} />
          <FilterItem name={Filter.Level.Professional} label={CameraLevel[Filter.Level.Professional]} checked={levelType === Filter.Level.Professional} />
        </CatalogFilterBlock>

        <button className="btn catalog-filter__reset-btn" type="reset" onClick={handleReset}>
        Сбросить фильтры
        </button>
      </form>
    </div>
  );
};

export default CatalogFilter;
