import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import AddEditTaskForm from './AddEditTaskForm';

const mockStore = configureMockStore([]);

describe('AddEditTaskForm', () => {
  const onSubmitMock = jest.fn();

  it('should render the form', () => {
    const store = mockStore({
      config: {
        selectedProject: {
          id: 1,
          timeSpent: 0,
        },
      },
    });

    render(
      <Provider store={store}>
        <AddEditTaskForm onSubmit={onSubmitMock} />
      </Provider>
    );

    expect(screen.getByLabelText('Task Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should call onSubmit when the form is submitted with valid data', () => {
    const store = mockStore({
      config: {
        selectedProject: {
          id: 1,
          timeSpent: 0,
        },
      },
    });

    render(
      <Provider store={store}>
        <AddEditTaskForm onSubmit={onSubmitMock} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Task Name'), {
      target: { value: 'Test Task' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Test Description' },
    });
    fireEvent.change(screen.getByLabelText('Status'), {
      target: { value: 'Done' },
    });
    fireEvent.change(screen.getByLabelText('Time Spent'), {
      target: { value: '1h 30m' },
    });

    fireEvent.click(screen.getByText('Submit'));

    expect(onSubmitMock).toHaveBeenCalled();
  });

  it('should display task data in the form fields', () => {
    const task = {
      id: 1,
      name: 'Task Name',
      description: 'Task Description',
      status: 'Done',
      timeSpent: '2h 30m',
      projectId: 1,
      dateAdded: new Date().toISOString(),
    };

    const store = mockStore({
      config: {
        selectedProject: {
          id: 1,
          timeSpent: 0,
        },
      },
    });

    render(
      <Provider store={store}>
        <AddEditTaskForm onSubmit={onSubmitMock} task={task} />
      </Provider>
    );

    expect(screen.getByLabelText('Task Name')).toHaveValue(
      'Task Name'
    );
    expect(screen.getByLabelText('Description')).toHaveValue(
      'Task Description'
    );
    expect(screen.getByLabelText('Status')).toHaveValue('Done');
    expect(screen.getByLabelText('Time Spent')).toHaveValue('2h 30m');
  });
});
