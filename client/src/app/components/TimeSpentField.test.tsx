import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TimeSpentField from './TimeSpentField';

describe('TimeSpentField', () => {
  const mockHandleChange = jest.fn();

  it('should render TimeSpentField component', () => {
    const formData = {
      name: 'Test Task',
      description: 'Test Description',
      status: 'Pending',
      projectId: 1,
      timeSpent: '2h',
    };
    const errors = {
      timeSpent: 'Time spent is required.',
    };

    render(
      <TimeSpentField
        formData={formData}
        errors={errors}
        handleChange={mockHandleChange}
      />
    );

    const inputElement = screen.getByLabelText('Time Spent');
    const errorElement = screen.getByText('Time spent is required.');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('2h');
    expect(errorElement).toBeInTheDocument();
  });

  it('should call handleChange when input value changes', () => {
    const formData = {
      name: 'Test Task',
      description: 'Test Description',
      status: 'Pending',
      projectId: 1,
      timeSpent: '2h',
    };
    const errors = {};

    render(
      <TimeSpentField
        formData={formData}
        errors={errors}
        handleChange={mockHandleChange}
      />
    );

    const inputElement = screen.getByLabelText('Time Spent');

    fireEvent.change(inputElement, { target: { value: '3h' } });

    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('should display error message when errors.timeSpent is present', () => {
    const formData = {
      name: 'Test Task',
      description: 'Test Description',
      status: 'Pending',
      projectId: 1,
      timeSpent: '2h',
    };
    const errors = {
      timeSpent: 'Time spent is required.',
    };

    render(
      <TimeSpentField
        formData={formData}
        errors={errors}
        handleChange={mockHandleChange}
      />
    );

    const errorElement = screen.getByText('Time spent is required.');

    expect(errorElement).toBeInTheDocument();
  });

  it('should not display error message when errors.timeSpent is not present', () => {
    const formData = {
      name: 'Test Task',
      description: 'Test Description',
      status: 'Pending',
      projectId: 1,
      timeSpent: '2h',
    };
    const errors = {};

    render(
      <TimeSpentField
        formData={formData}
        errors={errors}
        handleChange={mockHandleChange}
      />
    );

    const errorElement = screen.queryByText(
      'Time spent is required.'
    );

    expect(errorElement).toBeNull();
  });
});
