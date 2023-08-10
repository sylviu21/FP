import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoadMore from './LoadMore';

describe('LoadMore', () => {
  const mockLoadMore = jest.fn();
  const mockLoadAll = jest.fn();

  it('should render LoadMore component with buttons', () => {
    render(
      <LoadMore loadMore={mockLoadMore} loadAll={mockLoadAll} />
    );

    const loadMoreButton = screen.getByText('Load more');
    const loadAllButton = screen.getByText('Load all');

    expect(loadMoreButton).toBeInTheDocument();
    expect(loadAllButton).toBeInTheDocument();
  });

  it('should call loadMore when Load More button is clicked', () => {
    render(
      <LoadMore loadMore={mockLoadMore} loadAll={mockLoadAll} />
    );

    const loadMoreButton = screen.getByText('Load more');
    fireEvent.click(loadMoreButton);

    expect(mockLoadMore).toHaveBeenCalledTimes(1);
    expect(mockLoadAll).not.toHaveBeenCalled();
  });

  it('should call loadAll when Load All button is clicked', () => {
    render(
      <LoadMore loadMore={mockLoadMore} loadAll={mockLoadAll} />
    );

    const loadAllButton = screen.getByText('Load all');
    fireEvent.click(loadAllButton);

    expect(mockLoadAll).toHaveBeenCalledTimes(1);
    expect(mockLoadMore).not.toHaveBeenCalled();
  });
});
