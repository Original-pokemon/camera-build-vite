import { Link } from 'react-router-dom';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onClick: (page: number) => void;
}

const MAX_PAGES_IN_GROUP = 3;
const getPageLink = (page: number) => `?page=${page}`;

const renderPageLinks = ({ groupNumber, totalPages, currentPage, onClick }: { groupNumber: number; totalPages: number; currentPage: number; onClick: (page: number) => void }) => {
  const pageLinks = [];
  const startPage = (groupNumber - 1) * MAX_PAGES_IN_GROUP + 1;
  const endPage = Math.min(totalPages, groupNumber * MAX_PAGES_IN_GROUP);

  for (let i = startPage; i <= endPage; i++) {
    const isCurrentPage = i === currentPage;

    pageLinks.push(
      <li className="pagination__item" key={i}>
        <Link
          className={`pagination__link ${isCurrentPage ? 'pagination__link--active' : ''}`}
          onClick={() => {
            onClick(i);
          }}
          to={getPageLink(i)}
          data-testid={`page-link-${i}`}
        >
          {i}
        </Link>
      </li >

    );
  }

  return pageLinks;
};

const renderNextLink = ({ groupNumber, totalPages, onClick }: { groupNumber: number; totalPages: number; onClick: (page: number) => void }) => {
  if ((groupNumber * MAX_PAGES_IN_GROUP) < totalPages) {
    return (
      <li className="pagination__item" >
        <Link className="pagination__link pagination__link--text"
          onClick={() => {
            onClick((groupNumber * MAX_PAGES_IN_GROUP) + 1);
          }}
          to={getPageLink((groupNumber * MAX_PAGES_IN_GROUP) + 1)}
          data-testid="next-link"
        >
          Далее
        </Link>
      </li>

    );
  }
  return null;
};

const renderPrevLink = ({ groupNumber, currentPage, onClick }: { groupNumber: number; currentPage: number; onClick: (page: number) => void }) => {
  if (currentPage > MAX_PAGES_IN_GROUP) {
    return (
      <li className="pagination__item" >
        <Link
          className="pagination__link pagination__link--text"
          onClick={() => {
            onClick((groupNumber - 1) * MAX_PAGES_IN_GROUP);
          }}
          to={getPageLink((groupNumber - 1) * MAX_PAGES_IN_GROUP)}
          data-testid="prev-link"
        >
          Назад
        </Link>
      </li>
    );
  }
  return null;
};


const Pagination = ({ totalPages, currentPage, onClick }: PaginationProps) => {

  const groupNumber = Math.ceil(currentPage / MAX_PAGES_IN_GROUP);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {renderPrevLink({
          groupNumber,
          currentPage,
          onClick,
        })}
        {renderPageLinks({
          groupNumber,
          totalPages,
          currentPage,
          onClick,
        })}
        {renderNextLink({
          groupNumber,
          totalPages,
          onClick,
        })}
      </ul>
    </div>
  );
};

export default Pagination;
