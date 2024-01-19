import { Link } from 'react-router-dom';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onClick: (page: number) => void;
}

const getPageLink = (page: number) => `?page=${page}`;

const PaginationComponent = ({ totalPages, currentPage, onClick }: PaginationProps) => {
  const maxPagesInGroup = 3;
  const groupNumber = Math.ceil(currentPage / maxPagesInGroup);

  const renderPageLinks = () => {
    const pageLinks = [];
    const startPage = (groupNumber - 1) * maxPagesInGroup + 1;
    const endPage = Math.min(totalPages, groupNumber * maxPagesInGroup);

    for (let i = startPage; i <= endPage; i++) {
      const isCurrentPage = i === currentPage;

      pageLinks.push(
        <li className="pagination__item">
          <Link className={`pagination__link ${isCurrentPage ? 'pagination__link--active' : ''}`} onClick={() => {
            onClick(i);
          }} to={getPageLink(i)}
          >
            {i}
          </Link>
        </li >

      );
    }

    return pageLinks;
  };

  const renderNextLink = () => {
    if ((groupNumber * maxPagesInGroup) < totalPages) {
      return (
        <li className="pagination__item">
          <Link className="pagination__link pagination__link--text"
            onClick={() => {
              onClick((groupNumber * maxPagesInGroup) + 1);
            }}
            to={getPageLink((groupNumber * maxPagesInGroup) + 1)}
          >
            Далее
          </Link>
        </li>

      );
    }
    return null;
  };

  const renderPrevLink = () => {
    if (currentPage > maxPagesInGroup) {
      return (
        <li className="pagination__item">
          <Link className="pagination__link pagination__link--text" onClick={() => {
            onClick((groupNumber - 1) * maxPagesInGroup);
          }} to={getPageLink((groupNumber - 1) * maxPagesInGroup)}
          >
            Назад
          </Link>
        </li>
      );
    }
    return null;
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {renderPrevLink()}
        {renderPageLinks()}
        {renderNextLink()}
      </ul>
    </div>
  );
};

export default PaginationComponent;
