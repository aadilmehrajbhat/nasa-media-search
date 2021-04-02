import { SearchBar } from '@components/';
import { useDailyPicture } from '@hooks/';

function DailyPicture() {
  const picture = useDailyPicture();

  if (!picture) return null;

  return (
    <section className="py-10">
      <div className="flex justify-between items-baseline">
        <p>{picture.title}</p>
        <SearchBar />
      </div>
      <div className="my-5">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={picture.thumbnailUrl}
            alt={picture.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <p>{picture.explanation}</p>
      <p className="text-center mt-4">{picture.date}</p>
      {picture.copyright && (
        <p className="text-center my-4 text-gray-400">
          &#169; Copyright {picture.copyright}
        </p>
      )}
    </section>
  );
}

export default DailyPicture;
