import { Link } from 'react-router-dom';

function SearchKeywords({ keywords }) {
  if (!Array.isArray(keywords) || !keywords.length) return false;

  return (
    <div className="my-6">
      <h3 className="text-2xl">Also search for</h3>
      <div className="mt-3 w-1/2 flex flex-wrap">
        {keywords.map((keyword) => (
          <Link
            key={keyword}
            className="mr-4 mb-3 hover:underline"
            to={`/search?q=${keyword}`}
          >
            {keyword}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchKeywords;
