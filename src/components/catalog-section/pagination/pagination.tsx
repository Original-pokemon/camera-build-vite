import { useSearchParams } from 'react-router-dom';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onClick: (page: number) => void;
}

const MAX_PAGES_IN_GROUP = 3;

const renderPageLinks = ({ groupNumber, totalPages, currentPage, onClick }: { groupNumber: number; totalPages: number; currentPage: number; onClick: (page: number) => void }) => {
  const pageLinks = [];
  const startPage = (groupNumber - 1) * MAX_PAGES_IN_GROUP + 1;
  const endPage = Math.min(totalPages, groupNumber * MAX_PAGES_IN_GROUP);

  for (let i = startPage; i <= endPage; i++) {
    const isCurrentPage = i === currentPage;

    pageLinks.push(
      <li className="pagination__item" key={i}>
        <div
          className={`pagination__link ${isCurrentPage ? 'pagination__link--active' : ''}`}
          onClick={() => {
            onClick(i);
          }}
          style={{ cursor: 'pointer' }}
          data-testid={'page-link'}
        >
          {i}
        </div>
      </li >

    );
  }

  return pageLinks;
};

const Pagination = ({ totalPages, currentPage, onClick }: PaginationProps) => {
  const [, setSearchParams] = useSearchParams();
  const groupNumber = Math.ceil(currentPage / MAX_PAGES_IN_GROUP);

  const handlePageNumberClick = (page: number) => {
    setSearchParams((prevParams) => {
      prevParams.set('page', page.toString());
      return prevParams;
    });
    onClick(page);
  };
  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          (currentPage > MAX_PAGES_IN_GROUP) && (
            <li className="pagination__item" >
              <div
                className="pagination__link pagination__link--text"
                onClick={() => {
                  const pageNum = (groupNumber - 1) * MAX_PAGES_IN_GROUP;
                  setSearchParams((prevParams) => {

                    prevParams.set('page', pageNum.toString());

                    return prevParams;
                  });

                  onClick(pageNum);
                }}
                data-testid="prev-link"
                style={{ cursor: 'pointer' }}
              >
                Назад
              </div>
            </li>
          )
        }

        {renderPageLinks({
          groupNumber,
          totalPages,
          currentPage,
          onClick: handlePageNumberClick,
        })}

        {
          ((groupNumber * MAX_PAGES_IN_GROUP) < totalPages) && (
            <li className="pagination__item" >
              <div className="pagination__link pagination__link--text"
                onClick={() => {
                  const pageNum = (groupNumber * MAX_PAGES_IN_GROUP) + 1;
                  setSearchParams((prevParams) => {
                    prevParams.set('page', pageNum.toString());

                    return prevParams;
                  });
                  onClick(pageNum);
                }}
                style={{ cursor: 'pointer' }}
                data-testid="next-link"
              >
                Далее
              </div>
            </li>

          )
        }
      </ul>
    </div>
  );
};

export default Pagination;
