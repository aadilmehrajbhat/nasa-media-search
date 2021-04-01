import Api from '@api/';

export async function fetchPictureOfTheDay() {
  try {
    const { data } = await Api.get('/planetary/apod', {
      params: {
        thumbs: true,
        start_date: '2021-01-01',
        end_date: '2021-01-01',
      },
    });

    const [
      {
        date,
        explanation,
        title,
        media_type: mediaType,
        url,
        hdurl: hdUrl,
        thumbnail_url,
        copyright,
      },
    ] = data;

    const thumbnailUrl = mediaType === 'video' ? thumbnail_url : hdUrl || url;

    return {
      date,
      explanation,
      title,
      thumbnailUrl,
      copyright,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}

const MediaSearchAPI = {
  fetchPictureOfTheDay,
};

export default MediaSearchAPI;
