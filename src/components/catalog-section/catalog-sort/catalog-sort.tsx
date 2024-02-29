import { ChangeEvent } from 'react';
import Icon from '../../icon/icon';
import { useSearchParams } from 'react-router-dom';
import { Sort, SortDirection } from './../const';
import { isDirectionType, isSortType } from '../utils';


const CatalogSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sortBy');
  const sortType = isSortType(sortParam) ? sortParam : null;

  const directionParam = searchParams.get('direction');
  const sortDirection = isDirectionType(directionParam) ? directionParam : null;


  const handleSortDirectionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const sortDirectionValue = event.target.id;

    setSearchParams((prevParams) => {
      prevParams.set('sortBy', sortType ?? Sort.Price);
      prevParams.set('direction', sortDirectionValue);

      return prevParams;
    });
  };

  const handleSortTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const sortTypeValue = event.target.id;
    setSearchParams((prevParams) => {
      prevParams.set('sortBy', sortTypeValue);
      prevParams.set('direction', sortDirection ?? SortDirection.ASC);

      return prevParams;
    });
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type" onChange={handleSortTypeChange}>
            <div className="catalog-sort__btn-text">
              <input type="radio" id={Sort.Price} name="sort" checked={sortType === Sort.Price} defaultChecked />
              <label htmlFor={Sort.Price}>по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id={Sort.Popularity} name="sort" checked={sortType === Sort.Popularity} />
              <label htmlFor={Sort.Popularity}>по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order" onChange={handleSortDirectionChange}>
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio" id={SortDirection.ASC} name="sort-icon" checked={sortDirection === SortDirection.ASC} aria-label="По возрастанию" />
              <label htmlFor={SortDirection.ASC}>
                <Icon icon={'#icon-sort'} svgSize={{ width: 16, height: 14 }} ariaHidden />
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input type="radio" id={SortDirection.DESC} name="sort-icon" aria-label="По убыванию" checked={sortDirection === SortDirection.DESC} />
              <label htmlFor={SortDirection.DESC}>
                <Icon icon={'#icon-sort'} svgSize={{ width: 16, height: 14 }} ariaHidden />
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CatalogSort;
