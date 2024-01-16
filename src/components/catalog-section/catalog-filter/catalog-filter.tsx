import CatalogFilterBlockComponent from './catalog-filter-block/catalog-filter-block';
import FilterItemComponent from './filter-item/filter-item';
import CustomInputComponent from './сustom-input/custom-input';

const CatalogFilterComponent = () => (
  <div className="catalog-filter">
    <form action="#">
      <h2 className="visually-hidden">Фильтр</h2>

      <CatalogFilterBlockComponent legend="Цена, ₽">
        <div className="catalog-filter__price-range">
          <CustomInputComponent type="number" name="price" placeholder="от" />
          <CustomInputComponent type="number" name="priceUp" placeholder="до" />
        </div>
      </CatalogFilterBlockComponent>

      <CatalogFilterBlockComponent legend="Категория">
        <FilterItemComponent name="photocamera" label="Фотокамера" defaultChecked />
        <FilterItemComponent name="videocamera" label="Видеокамера" />
      </CatalogFilterBlockComponent>

      <CatalogFilterBlockComponent legend="Тип камеры">
        <FilterItemComponent name="digital" label="Цифровая" defaultChecked />
        <FilterItemComponent name="film" label="Плёночная" disabled />
        <FilterItemComponent name="snapshot" label="Моментальная" />
        <FilterItemComponent name="collection" label="Коллекционная" disabled defaultChecked />
      </CatalogFilterBlockComponent>

      <CatalogFilterBlockComponent legend="Уровень">
        <FilterItemComponent name="zero" label="Нулевой" defaultChecked />
        <FilterItemComponent name="non-professional" label="Любительский" />
        <FilterItemComponent name="professional" label="Профессиональный" />
      </CatalogFilterBlockComponent>

      <button className="btn catalog-filter__reset-btn" type="reset">
        Сбросить фильтры
      </button>
    </form>
  </div>
);

export default CatalogFilterComponent;
