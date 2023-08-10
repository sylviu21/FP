import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from './Search';

describe('Search', () => {
  const mockOnSearch = jest.fn();

  it('should render Search component', () => {
    render(<Search onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Search');
    const searchButton = screen.getByText('Search');

    expect(inputElement).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('should call onSearch with input value when form is submitted', () => {
    render(<Search onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(
      'Search'
    ) as HTMLInputElement;
    const searchButton = screen.getByText('Search');

    fireEvent.change(inputElement, {
      target: { value: 'test value' },
    });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('test value');
    expect(inputElement.value).toBe('');
  });
});
