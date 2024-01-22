import CatalogFilterBlock from './catalog-filter-block/catalog-filter-block';
import FilterItem from './filter-item/filter-item';
import CustomInput from './сustom-input/custom-input';

const CatalogFilter = () => (
  <div className="catalog-filter">
    <form action="#">
      <h2 className="visually-hidden">Фильтр</h2>

      <CatalogFilterBlock legend="Цена, ₽">
        <div className="catalog-filter__price-range">
          <CustomInput type="number" name="price" placeholder="от" />
          <CustomInput type="number" name="priceUp" placeholder="до" />
        </div>
      </CatalogFilterBlock>

      <CatalogFilterBlock legend="Категория">
        <FilterItem name="photocamera" label="Фотокамера" defaultChecked />
        <FilterItem name="videocamera" label="Видеокамера" />
      </CatalogFilterBlock>

      <CatalogFilterBlock legend="Тип камеры">
        <FilterItem name="digital" label="Цифровая" defaultChecked />
        <FilterItem name="film" label="Плёночная" disabled />
        <FilterItem name="snapshot" label="Моментальная" />
        <FilterItem name="collection" label="Коллекционная" disabled defaultChecked />
      </CatalogFilterBlock>

      <CatalogFilterBlock legend="Уровень">
        <FilterItem name="zero" label="Нулевой" defaultChecked />
        <FilterItem name="non-professional" label="Любительский" />
        <FilterItem name="professional" label="Профессиональный" />
      </CatalogFilterBlock>

      <button className="btn catalog-filter__reset-btn" type="reset">
        Сбросить фильтры
      </button>
    </form>
  </div>
);

export default CatalogFilter;
