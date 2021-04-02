import { useCallback, useEffect, useMemo, useState } from 'react';
import { MediaSearchAPI } from '@api/';
import { paginate } from '@utils/';

const DEFAULT_PAGE_SIZE = 10;

function useImagesCollection({ query, pageSize = DEFAULT_PAGE_SIZE } = {}) {
  const [imagesList, setImagesList] = useState();
  const [totalCount, setTotalCount] = useState();
  const [activePage, setActivePage] = useState();

  const [isFetchLoading, setFetchLoading] = useState(true);

  const fetchImages = useCallback(() => {
    if (!query) return;
    setFetchLoading(true);
    MediaSearchAPI.fetchImagesByQuery({ query })
      .then((data) => {
        setImagesList(data.imagesList);
        setTotalCount(data.totalCount);
        setActivePage(1);
      })
      .catch(console.log)
      .finally(() => setFetchLoading(false));
  }, [query]);

  const loadMoreImages = useCallback(() => {
    if (!Array.isArray(imagesList) || imagesList.length === 0) return;
    const nextPage = imagesList.length / 100 + 1;

    MediaSearchAPI.fetchImagesByQuery({
      query,
      page: nextPage,
    })
      .then((data) => setImagesList((prev) => [...prev, ...data.imagesList]))
      .catch(console.log);
  }, [imagesList, query, setImagesList]);

  const canLoadMoreData = useMemo(() => {
    if (!totalCount) return false;

    if (Array.isArray(imagesList) && imagesList.length === totalCount)
      return false;

    const currentPageResult = imagesList.length - (activePage - 1) * pageSize;

    return currentPageResult < pageSize;
  }, [imagesList, totalCount, activePage, pageSize]);

  const data = useMemo(() => {
    if (!imagesList) return null;

    return paginate(imagesList, activePage, pageSize);
  }, [imagesList, pageSize, activePage]);

  const keywords = useMemo(() => {
    if (!imagesList) return null;

    const keywords = new Set();

    imagesList.forEach(
      (data) => Array.isArray(data.keywords) && keywords.add(...data.keywords),
    );
    return Array.from(keywords).slice(1, 5);
  }, [imagesList]);

  useEffect(() => {
    canLoadMoreData && loadMoreImages();
  }, [canLoadMoreData, loadMoreImages]);

  return {
    isFetchLoading,
    data,
    keywords,
    totalCount,
    pageSize,
    activePage,
    setActivePage,
    fetchImages,
  };
}

export default useImagesCollection;
