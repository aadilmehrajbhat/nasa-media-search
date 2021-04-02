import { getReadableDate } from '@utils/date';

function MediaItem({ item }) {
  return (
    <div className="flex mb-5">
      <div className="w-32">
        <div className="aspect-w-16 aspect-h-9">
          <img className="w-full h-full" src={item.href} alt={item.title} />
        </div>
      </div>
      <div className="ml-3">
        <p>{item.title}</p>
        <small className="text-gray-400">
          {getReadableDate(item.dateCreated)}
        </small>
      </div>
    </div>
  );
}

export default MediaItem;
