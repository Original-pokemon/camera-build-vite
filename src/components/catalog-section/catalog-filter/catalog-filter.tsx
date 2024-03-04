import { useSearchParams } from 'react-router-dom';
import CatalogFilterBlock from './catalog-filter-block/catalog-filter-block';
import FilterItem from './filter-item/filter-item';
import CustomInput from './сustom-input/custom-input';
import { Camera, CameraCategory, CameraLevel, Filter } from '../../../const';
import { FilterParamName, MAX_PRICE_NAME, MIN_PRICE_NAME } from '../const';
import { ChangeEvent, useEffect, useState } from 'react';
import { isCameraType, isCategoryType, isLevelType } from '../utils';
import useDebounce from '../../../hooks/use-debounce';

const CatalogFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPrice, setPrice] = useState<{ [key: string]: number }>({ [MIN_PRICE_NAME]: 0, [MAX_PRICE_NAME]: 0 });
  const currentPriceDebounce = useDebounce(currentPrice, 500);

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
      const price = +value;
      setPrice((prevPrice) => ({
        ...prevPrice,
        [name]: price,
      }));

      target.value = price.toString();
    }

  };

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
      return prevParams;
    });
  };

  useEffect(() => {
    if (currentPriceDebounce[MIN_PRICE_NAME] && +currentPriceDebounce[MIN_PRICE_NAME] > 0) {
      setSearchParams((prevParams) => {
        const minPrice = +currentPriceDebounce[MIN_PRICE_NAME];

        prevParams.set(MIN_PRICE_NAME, minPrice.toString());
        return prevParams;
      });
    } else {
      setSearchParams((prevParams) => {
        prevParams.delete(MIN_PRICE_NAME);
        return prevParams;
      });
    }

    if (currentPriceDebounce[MAX_PRICE_NAME] && +currentPriceDebounce[MAX_PRICE_NAME] > 0) {
      setSearchParams((prevParams) => {
        const maxPrice = +currentPriceDebounce[MAX_PRICE_NAME];

        prevParams.set(MAX_PRICE_NAME, maxPrice.toString());
        return prevParams;
      });
    } else {
      setSearchParams((prevParams) => {
        prevParams.delete(MAX_PRICE_NAME);
        return prevParams;
      });
    }
  }, [currentPriceDebounce, setSearchParams]);

  return (
    <div className="catalog-filter">
      <form action="#" data-testid='form'>
        <h2 className="visually-hidden">Фильтр</h2>

        <CatalogFilterBlock legend="Цена, ₽" onChange={handlePriceChange}>
          <div className="catalog-filter__price-range">
            <CustomInput type="number" name={MIN_PRICE_NAME} placeholder="от" />
            <CustomInput type="number" name={MAX_PRICE_NAME} placeholder="до" />
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
