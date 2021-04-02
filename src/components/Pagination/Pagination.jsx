import { useMemo } from 'react';
import _ from 'lodash';

const DEFAULT_PAGINATION_SIZE = 5;

function Pagination({
  className,
  pageSize = 1,
  totalCount = 0,
  currentPage = 1,
  paginationSize = DEFAULT_PAGINATION_SIZE,
  onPageClick,
}) {
  const pageCount = useMemo(() => Math.ceil(totalCount / pageSize), [
    totalCount,
    pageSize,
  ]);
  const pages = useMemo(() => {
    const pageChunks = _.range(1, pageCount, paginationSize);
    pageChunks.push(pageCount);

    const startIndex = _.findLast(pageChunks, (chunk) => currentPage >= chunk);
    const endIndex = pageChunks.find((chunk) => chunk > currentPage);

    return endIndex ? _.range(startIndex, endIndex) : [startIndex];
  }, [pageCount, paginationSize, currentPage]);

  const hasPrev = currentPage >= pageSize;
  const hasNext = !pages.includes(pageCount);

  if (pageCount <= 1) return null;

  return (
    <div className={className}>
      <div className="flex">
        {hasPrev && (
          <button
            onClick={() => onPageClick(pages[0] - 1)}
            className="mr-2 hover:opacity-75 cursor-pointer focus:outline-none hover:underline"
          >
            Prev
          </button>
        )}
        {pages &&
          pages.map((page) => (
            <button
              key={page}
              onClick={(_) => onPageClick && onPageClick(page)}
              className={`mr-2 hover:opacity-75 cursor-pointer focus:outline-none hover:underline ${
                currentPage === page ? ' text-pink-400' : ''
              }`}
            >
              {page}
            </button>
          ))}
        {hasNext && (
          <button
            onClick={() => onPageClick(pages[pages.length - 1] + 1)}
            className="mr-2 hover:opacity-75 cursor-pointer focus:outline-none hover:underline"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Pagination;
