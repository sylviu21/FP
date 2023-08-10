import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import AddEditProjectForm from './AddEditProjectForm';
import { updateProject } from 'app/store/slices';

const mockStore = configureMockStore([]);

describe('AddEditProjectForm', () => {
  const onSubmitMock = jest.fn();
  const project = {
    id: 1,
    name: 'Test Project',
    description: 'Test Description',
    client: 'Client 2',
    deadline: '2023-08-10',
    dateAdded: new Date().toISOString(),
  };
  it('should render the form', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <AddEditProjectForm
          onSubmit={onSubmitMock}
          project={project}
        />
      </Provider>
    );

    expect(screen.getByLabelText('Project Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Client')).toBeInTheDocument();
    expect(screen.getByLabelText('Deadline')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should call onSubmit when the form is submitted with valid data', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <AddEditProjectForm onSubmit={onSubmitMock} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Project Name'), {
      target: { value: 'Test Project' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Test Description' },
    });
    fireEvent.change(screen.getByLabelText('Client'), {
      target: { value: 'Client 2' },
    });
    fireEvent.change(screen.getByLabelText('Deadline'), {
      target: { value: '2023-08-10' },
    });

    fireEvent.click(screen.getByText('Submit'));

    expect(onSubmitMock).toHaveBeenCalled();
  });

  it('should display errors for invalid form data', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <AddEditProjectForm onSubmit={onSubmitMock} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Submit'));

    expect(
      screen.getByText('Project name is required.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Select a deadline.')
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Project Name'), {
      target: { value: 'Test Project' },
    });
    fireEvent.change(screen.getByLabelText('Deadline'), {
      target: { value: '2020-01-01' },
    });

    fireEvent.click(screen.getByText('Submit'));

    expect(
      screen.getByText('The deadline cannot be in the past.')
    ).toBeInTheDocument();
  });

  it('should call updateProject when the form is submitted with valid data for updating a project', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <AddEditProjectForm
          onSubmit={onSubmitMock}
          project={project}
        />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Project Name'), {
      target: { value: 'Updated Test Project' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Updated Test Description' },
    });
    fireEvent.change(screen.getByLabelText('Client'), {
      target: { value: 'Client 3' },
    });
    fireEvent.change(screen.getByLabelText('Deadline'), {
      target: { value: '2023-08-15' },
    });

    fireEvent.click(screen.getByText('Submit'));

    const expectedUpdatedProject = {
      ...project,
      name: 'Updated Test Project',
      description: 'Updated Test Description',
      client: 'Client 3',
      deadline: '2023-08-15',
    };

    expect(store.getActions()).toEqual([
      updateProject(expectedUpdatedProject),
    ]);
    expect(onSubmitMock).toHaveBeenCalled();
  });
});
