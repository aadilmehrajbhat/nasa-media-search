import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Pagination, MediaList, SearchKeywords } from '@components/';
import { useQuery } from '@hooks/';
import { useImagesCollection } from '@hooks/';
import { useEffect } from 'react';
import { ReactComponent as SpinnerIcon } from '@assets/icons/spinner.svg';

function SearchResults() {
  const query = useQuery();
  const queryString = query.get('q');

  const history = useHistory();
  const {
    keywords,
    data,
    totalCount,
    pageSize,
    activePage,
    isFetchLoading,
    setActivePage,
    fetchImages,
  } = useImagesCollection({ query: queryString });

  if (!queryString) {
    history.push('/');
  }
  const onPageClick = useCallback(
    (page) => {
      setActivePage(page);
    },
    [setActivePage],
  );

  useEffect(() => {
    fetchImages(queryString);
  }, [fetchImages, queryString]);

  return (
    <Container>
      {isFetchLoading ? (
        <div className="flex h-44 justify-center items-center">
          <SpinnerIcon className="animate-spin w-8 h-8" />
        </div>
      ) : (
        <section className="py-5">
          <h2 className="text-xl">
            {totalCount
              ? `About ${totalCount} results found for "${queryString}"`
              : `No results found for "${queryString}"`}
          </h2>
          <MediaList className="mt-4" data={data} />
          <Pagination
            className="pt-4"
            totalCount={totalCount}
            pageSize={pageSize}
            currentPage={activePage}
            onPageClick={onPageClick}
          />
          <SearchKeywords keywords={keywords} />
        </section>
      )}
    </Container>
  );
}

export default SearchResults;
