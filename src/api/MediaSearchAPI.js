export async function fetchPictureOfTheDay() {
  try {
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
    ] = await (
      await fetch(
        'https://api.nasa.gov/planetary/apod?api_key=KmWdt3EMrEBFC2cmU8zb1VBk5oWvUZu0qzwPQ5v0&thumbs=true&start_date=2021-01-01&end_date=2021-01-01',
      )
    ).json();

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
