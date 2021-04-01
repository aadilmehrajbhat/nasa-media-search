import { useDailyPicture } from '@hooks/';

function DailyPicture() {
  const picture = useDailyPicture();

  if (!picture) return null;

  return (
    <section className="py-10">
      <p>{picture.title}</p>
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
      <small>{picture.date}</small>
      {picture.copyright && <p>Copyright {picture.copyright}</p>}
    </section>
  );
}

export default DailyPicture;
