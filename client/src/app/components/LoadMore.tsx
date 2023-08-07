import React, { FC } from 'react';

interface ILoadMoreProps {
  loadMore: () => void;
  loadAll: () => void;
}

const LoadMore: FC<ILoadMoreProps> = ({ loadMore, loadAll }) => {
  return (
    <div className='flex justify-center items-center'>
      <button
        className='font-medium text-blue-600 dark:text-blue-500 hover:underline mr-5'
        onClick={loadMore}
      >
        Load more
      </button>
      |
      <button
        className='font-medium text-blue-600 dark:text-blue-500 hover:underline ml-5'
        onClick={loadAll}
      >
        Load all
      </button>
    </div>
  );
};
export default LoadMore;
