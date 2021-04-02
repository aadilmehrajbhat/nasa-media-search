import { useState, useCallback, useRef } from 'react';
import { ReactComponent as SearchIcon } from '@assets/icons/search.svg';
import { useHistory } from 'react-router-dom';

function SearchBar() {
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  const handleChange = useCallback((e) => setSearchQuery(e.target.value), []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!searchQuery) {
        inputRef.current.focus();
        return;
      }
      console.log('click');

      history.push({ pathname: '/search', search: `?q=${searchQuery}` });
    },
    [inputRef, history, searchQuery],
  );

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <input
        className="inline-block w-72 py-2  pl-4 pr-12  h-full font-sans bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full"
        type="text"
        placeholder="Search images e.g. Apollo 11"
        ref={inputRef}
        value={searchQuery}
        onChange={handleChange}
      />
      <button className="absolute right-3 top-1/2 px-1 transform -translate-y-1/2 text-gray-400 rounded focus:outline-none hover:text-gray-300">
        <SearchIcon className="h-6" />
      </button>
    </form>
  );
}

export default SearchBar;
