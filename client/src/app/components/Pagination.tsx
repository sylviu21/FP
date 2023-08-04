import React, { FC } from 'react';

interface IPaginationProps {
  total: number;
  current: number;
  onSelect: (page: number) => void;
}

const Pagination: FC<IPaginationProps> = ({
  total,
  current,
  onSelect,
}) => {
  const startPage = Math.max(current - 3, 1);
  const endPage = Math.min(current + 3, total);

  const handlePageChange = (page: number) => {
    onSelect(page);
  };

  return (
    <div className='flex full-width justify-end'>
      <div className='flex full-width justify-end'>
        <div className='flex py-5'>
          <button
            onClick={() => handlePageChange(current - 1)}
            className={`h-6 px-4 hover:bg-indigo-600 hover:text-white ${
              current === 1 ? 'cursor-not-allowed' : ''
            }`}
            disabled={current === 1}
          >
            <svg className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
              <path
                d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                clipRule='evenodd'
                fillRule='evenodd'
              ></path>
            </svg>
          </button>
          {Array.from({ length: endPage - startPage + 1 }).map(
            (_, i) => {
              const page = startPage + i;
              return (
                <button
                  key={i}
                  onClick={() => handlePageChange(page)}
                  className={`h-6 w-8 rounded ${
                    page === current ? 'bg-indigo-600 text-white' : ''
                  }`}
                >
                  {page}
                </button>
              );
            }
          )}
          <button
            onClick={() => handlePageChange(current + 1)}
            className={`h-6 px-4 hover:bg-indigo-600 hover:text-white ${
              current === total ? 'cursor-not-allowed' : ''
            }`}
            disabled={current === total}
          >
            <svg className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
              <path
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
                fillRule='evenodd'
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
