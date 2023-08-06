import React, { FC, useRef } from 'react';

interface ISearchProps {
  onSearch: (value: string) => void;
}

const Search: FC<ISearchProps> = ({ onSearch }) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchRef.current) {
      onSearch(searchRef.current.value);
      searchRef.current.value = '';
    }
  };

  return (
    <div className='w-1/2 flex justify-end'>
      <form onSubmit={handleSearch}>
        <input
          className='border rounded-full py-2 px-4'
          type='search'
          placeholder='Search'
          aria-label='Search'
          ref={searchRef}
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2'
          type='submit'
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
