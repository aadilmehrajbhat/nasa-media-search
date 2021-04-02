import MediaItem from './MediaItem';

function MediaList({ data, className }) {
  if (!Array.isArray(data) || !data.length) return null;

  return (
    <section className={className}>
      {data.map((item, index) => (
        <MediaItem item={item} key={index} />
      ))}
    </section>
  );
}

export default MediaList;
