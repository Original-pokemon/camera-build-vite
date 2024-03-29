import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState, KeyboardEvent as ReactKeyboard } from 'react';
import { useAppSelector } from '../../../hooks/state';
import { getProducts } from '../../../store/action';
import { ProductType } from '../../../types';
import Icon from '../../icon/icon';
import classNames from 'classnames';
import ReactFocusLock from 'react-focus-lock';
import { AppRoute } from '../../../const';
import { Link, generatePath } from 'react-router-dom';
import { debounce } from '../../../utils/debounce';

const MIN_SEARCH_INPUT_LENGTH = 3;

const getSearchedProducts = (products: ProductType[], searchText: string) => {
  const filteredProducts = products.filter(({ name }) => {
    const productName = name.toLowerCase();

    if (productName.includes(searchText.toLowerCase())) {
      return true;
    }
    return false;
  });
  return filteredProducts;
};

const SearchForm = () => {
  const products = useAppSelector(getProducts);
  const [inputValue, setInputValue] = useState('');
  const isShowList = inputValue.length >= MIN_SEARCH_INPUT_LENGTH;
  const [focusedIndex, setFocusedIndex] = useState<null | number>(null);
  const [setInputValueDebounced] = debounce<string>(setInputValue, 500);

  const listRef = useRef<HTMLUListElement>(null);

  const searchInput = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLInputElement>(null);
  const resetSearchInput = () => {
    if (searchInput.current) {
      searchInput.current.value = '';
    }

    setInputValue('');
    setFocusedIndex(null);
  };

  const searchedProducts = useMemo(() => isShowList ? getSearchedProducts(products, inputValue) : [], [products, inputValue, isShowList]);

  useEffect(() => {
    const handleEscKeydown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        resetSearchInput();
      }
    };

    const handleOutsideClick = (evt: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(evt.target as Node)) {
        resetSearchInput();
      }
    };

    window.addEventListener('keydown', handleEscKeydown);
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('keydown', handleEscKeydown);
      window.removeEventListener('click', handleOutsideClick);
      resetSearchInput();
    };
  }, []);

  useEffect(() => {
    const current = listRef.current;

    if (focusedIndex !== null && current) {
      const nextElem = current.children[focusedIndex]?.firstChild as HTMLElement;

      if (nextElem) {
        nextElem.focus();
      }

    }

  }, [focusedIndex]);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  const handleInputValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();

    const value = evt.target.value;
    setInputValueDebounced(value);
  };

  const handleResetButtonClick = () => {
    resetSearchInput();

    if (searchInput.current) {
      searchInput.current.focus();
    }
  };

  const handleArrowKeydown = (evt: ReactKeyboard) => {
    if (!isShowList) {
      return;
    }
    if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp') {
      evt.preventDefault();

      setFocusedIndex((prevState) => {
        let nextIndex = prevState;

        const maxIndex = searchedProducts.length - 1;

        if (evt.key === 'ArrowDown') {
          if (nextIndex === null) {
            nextIndex = 0;
            return nextIndex;
          }

          nextIndex = (nextIndex + 1) <= maxIndex ? nextIndex + 1 : 0;
        }
        if (evt.key === 'ArrowUp') {
          if (nextIndex === null) {
            return nextIndex;
          }

          nextIndex = (nextIndex - 1) >= 0 ? nextIndex - 1 : maxIndex;
        }

        return nextIndex;
      });
    }
  };

  return (
    <div
      className={classNames({ 'list-opened': searchedProducts.length }, 'form-search')}
      ref={formRef}
    >
      <ReactFocusLock disabled={!inputValue}>
        <form onSubmit={handleFormSubmit} onKeyDown={handleArrowKeydown}>
          <label>
            <Icon className={'form-search__icon'} icon={'#icon-lens'} svgSize={{ width: 16, height: 16 }} ariaHidden />

            <input
              className="form-search__input"
              type="text" autoComplete="off"
              placeholder="Поиск по сайту"
              onChange={handleInputValueChange}
              ref={searchInput}
            />
          </label>

          <ul className="form-search__select-list" ref={listRef} >
            {searchedProducts.map(({ id, name }, i) => (
              <li key={id} className="form-search__select-item">
                <Link
                  to={generatePath(AppRoute.Product, { id: id.toString() })}
                  tabIndex={0}
                  onFocus={() => setFocusedIndex(i)}
                  style={{ width: '100%', display: 'block' }}
                  onClick={() => resetSearchInput()}
                  data-testid={'product-link'}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

        </form>
        <button
          className="form-search__reset"
          type="reset"
          onClick={handleResetButtonClick}
          style={{ display: inputValue.length ? 'flex' : 'none' }}
        >
          <Icon icon={'#icon-close'} svgSize={{ width: 10, height: 10 }} ariaHidden />

          <span className="visually-hidden">Сбросить поиск</span>
        </button>
      </ReactFocusLock>
    </div>
  );
};

export default SearchForm;
