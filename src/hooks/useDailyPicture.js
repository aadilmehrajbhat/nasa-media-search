import { useState, useEffect } from 'react';
import { MediaSearchAPI } from '@api/';

function useDailyPicture() {
  const [pictureData, setPictureData] = useState();

  useEffect(() => {
    MediaSearchAPI.fetchPictureOfTheDay()
      .then((data) => {
        setPictureData(data);
      })
      .catch((error) => {
        console.log(
          'Error while fetching the picture of the day',
          error.message,
        );
      });
  }, []);

  return pictureData;
}

export default useDailyPicture;
