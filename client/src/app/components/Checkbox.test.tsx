import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  const mockTask = {
    id: 1,
    name: 'Sample Task',
    description: 'This is a sample task',
    status: 'Pending',
    projectId: 123,
    dateAdded: new Date().toISOString(),
  };

  it('should render the checkbox', () => {
    const onCheckboxChangeMock = jest.fn();
    const isComplete = false;

    render(
      <Checkbox
        task={mockTask}
        onCheckboxChange={onCheckboxChangeMock}
        isComplete={isComplete}
      />
    );

    const checkboxInput = screen.getByRole('checkbox');
    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxInput).not.toBeChecked();
    expect(checkboxInput).toBeEnabled();
  });

  it('should render the checkbox as checked if task status is "Done"', () => {
    const onCheckboxChangeMock = jest.fn();
    const isComplete = false;
    const taskWithDoneStatus = {
      ...mockTask,
      status: 'Done',
    };

    render(
      <Checkbox
        task={taskWithDoneStatus}
        onCheckboxChange={onCheckboxChangeMock}
        isComplete={isComplete}
      />
    );

    const checkboxInput = screen.getByRole('checkbox');
    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxInput).toBeChecked();
    expect(checkboxInput).toBeEnabled();
  });

  it('should render the checkbox as disabled if isComplete is true', () => {
    const onCheckboxChangeMock = jest.fn();
    const isComplete = true;

    render(
      <Checkbox
        task={mockTask}
        onCheckboxChange={onCheckboxChangeMock}
        isComplete={isComplete}
      />
    );

    const checkboxInput = screen.getByRole('checkbox');
    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxInput).not.toBeChecked();
    expect(checkboxInput).toBeDisabled();
  });

  it('should call onCheckboxChange when checkbox is clicked', () => {
    const onCheckboxChangeMock = jest.fn();
    const isComplete = false;

    render(
      <Checkbox
        task={mockTask}
        onCheckboxChange={onCheckboxChangeMock}
        isComplete={isComplete}
      />
    );

    const checkboxInput = screen.getByRole('checkbox');
    fireEvent.click(checkboxInput);
    expect(onCheckboxChangeMock).toHaveBeenCalledTimes(1);
  });
});
