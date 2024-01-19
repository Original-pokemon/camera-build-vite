import IconComponent from '../../icon/icon';

const SearchForm = () => {
  const selectItems = [
    'Cannonball Pro MX 8i',
    'Cannonball Pro MX 7i',
    'Cannonball Pro MX 6i',
    'Cannonball Pro MX 5i',
    'Cannonball Pro MX 4i',
  ];

  const selectItemsElements = selectItems.map((item, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <li key={index} className="form-search__select-item">
      {item}
    </li>
  ));

  return (
    <form>
      <label>
        <IconComponent className={'form-search__icon'} icon={'#icon-lens'} svgSize={{ width: 16, height: 16 }} ariaHidden />

        <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" />
      </label>
      <ul className="form-search__select-list">
        {selectItemsElements}
      </ul>
    </form>
  );
};

export default SearchForm;
