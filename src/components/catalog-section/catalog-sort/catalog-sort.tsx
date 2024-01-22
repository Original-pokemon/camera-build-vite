import Icon from '../../icon/icon';

const CatalogSort = () => (
  <div className="catalog-sort">
    <form action="#">
      <div className="catalog-sort__inner">
        <p className="title title--h5">Сортировать:</p>
        <div className="catalog-sort__type">
          <div className="catalog-sort__btn-text">
            <input type="radio" id="sortPrice" name="sort" defaultChecked />
            <label htmlFor="sortPrice">по цене</label>
          </div>
          <div className="catalog-sort__btn-text">
            <input type="radio" id="sortPopular" name="sort" />
            <label htmlFor="sortPopular">по популярности</label>
          </div>
        </div>
        <div className="catalog-sort__order">
          <div className="catalog-sort__btn catalog-sort__btn--up">
            <input type="radio" id="up" name="sort-icon" defaultChecked aria-label="По возрастанию" />
            <label htmlFor="up">
              <Icon icon={'#icon-sort'} svgSize={{ width: 16, height: 14 }} ariaHidden />
            </label>
          </div>
          <div className="catalog-sort__btn catalog-sort__btn--down">
            <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" />
            <label htmlFor="down">
              <Icon icon={'#icon-sort'} svgSize={{ width: 16, height: 14 }} ariaHidden />
            </label>
          </div>
        </div>
      </div>
    </form>
  </div>
);

export default CatalogSort;
