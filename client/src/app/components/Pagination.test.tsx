import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pagination from './Pagination';

describe('Pagination', () => {
  const mockTotal = 10;
  const mockCurrent = 5;
  const mockOnSelect = jest.fn();

  it('should render Pagination component with page buttons', () => {
    render(
      <Pagination
        total={mockTotal}
        current={mockCurrent}
        onSelect={mockOnSelect}
      />
    );

    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(9);
  });

  it('should call onSelect when page button is clicked', () => {
    render(
      <Pagination
        total={mockTotal}
        current={mockCurrent}
        onSelect={mockOnSelect}
      />
    );

    const secondPageButton = screen.getByText('2');
    fireEvent.click(secondPageButton);

    expect(mockOnSelect).toHaveBeenCalledWith(2);
  });

  it('should disable prev/next buttons on first and last pages', () => {
    render(
      <Pagination
        total={mockTotal}
        current={1}
        onSelect={mockOnSelect}
      />
    );

    const prevButton = screen.getByTestId('prev-page-btn');
    const nextButton = screen.getByTestId('next-page-btn');

    expect(prevButton).toHaveClass('cursor-not-allowed');
    expect(nextButton).not.toHaveClass('cursor-not-allowed');
  });
});
