import { useSearchParams } from 'react-router-dom';
import CatalogFilterBlock from './catalog-filter-block/catalog-filter-block';
import FilterItem from './filter-item/filter-item';
import CustomInput from './сustom-input/custom-input';
import { Camera, CameraCategory, CameraLevel, Filter } from '../../../const';
import { FilterParamName } from '../const';
import { ChangeEvent } from 'react';
import { isCameraType, isCategoryType, isLevelType } from '../utils';

const CatalogFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  return (
    <div className="catalog-filter">
      <form action="#" data-testid='form'>
        <h2 className="visually-hidden">Фильтр</h2>

        <CatalogFilterBlock legend="Цена, ₽" >
          <div className="catalog-filter__price-range">
            <CustomInput type="number" name="price" placeholder="от" />
            <CustomInput type="number" name="priceUp" placeholder="до" />
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
