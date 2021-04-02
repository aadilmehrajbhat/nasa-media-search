import Api from '@api/';

export async function fetchPictureOfTheDay() {
  const { data } = await Api.get('/planetary/apod', {
    params: {
      thumbs: true,
      api_key: process.env.REACT_APP_API_KEY,
    },
  });

  const {
    date,
    explanation,
    title,
    media_type: mediaType,
    url,
    hdurl: hdUrl,
    thumbnail_url,
    copyright,
  } = data;

  const thumbnailUrl = mediaType === 'video' ? thumbnail_url : hdUrl || url;

  return {
    date,
    explanation,
    title,
    thumbnailUrl,
    copyright,
  };
}

export async function fetchImagesByQuery({ query, page = 1 }) {
  const url = 'https://images-api.nasa.gov/search';
  const { data } = await Api.get(url, {
    params: { q: query, media_type: 'image', page },
  });
  const {
    collection: {
      items = [],
      metadata: { total_hits: totalCount },
    },
  } = data;

  const imagesList = items.map(
    ({
      links: [{ href }],
      data: [{ title, date_created: dateCreated, keywords }],
    }) => ({
      href,
      title,
      dateCreated,
      keywords,
    }),
  );

  return { imagesList, totalCount };
}

const MediaSearchAPI = {
  fetchPictureOfTheDay,
  fetchImagesByQuery,
};

export default MediaSearchAPI;
