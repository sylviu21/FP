import React, { FC, useEffect, useState } from 'react';
import TasksHeader from './TasksHeader';
import Pagination from './Pagination';
import TasksRow from './TasksRow';
import Modal from './Modal';
import AddEditTaskForm from 'app/forms/AddEditTaskForm';

import { Task, TASK_STATUS_TYPE } from 'app/types/types';
import { useAppSelector } from 'app/custom-hooks';
import { sortArray } from 'app/utils';

interface ITasksTableProps {
  tasks: Task[];
  handleSubmitProject?: () => void;
}

const TASKS_PER_PAGE = 4;

const TasksTable: FC = () => {
  const { tasks: tasksData } = useAppSelector<ITasksTableProps>(
    (state) => state.tasks
  );
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toggleSort, setToggleSort] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [currentTasks, setCurrentTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tasks, setTasks] = useState<Task[]>(tasksData);

  const totalFilteredTasks = tasks.length;
  const total = Math.ceil(totalFilteredTasks / TASKS_PER_PAGE);

  useEffect(() => {
    setTasks(tasksData);
  }, [tasksData]);

  useEffect(() => {
    const indexOfLastTask = currentPage * TASKS_PER_PAGE;
    const indexOfFirstTask = indexOfLastTask - TASKS_PER_PAGE;
    let curTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
    setCurrentTasks(curTasks);
  }, [currentPage, selectedFilter, toggleSort, tasks]);

  useEffect(() => {
    let filteredTasks = [];

    switch (selectedFilter) {
      case TASK_STATUS_TYPE.DONE:
        filteredTasks = tasksData.filter(
          (task) => task.status === TASK_STATUS_TYPE.DONE
        );
        break;
      case TASK_STATUS_TYPE.INPROGRESS:
        filteredTasks = tasksData.filter(
          (task) => task.status === TASK_STATUS_TYPE.INPROGRESS
        );
        break;
      case TASK_STATUS_TYPE.PENDING:
        filteredTasks = tasksData.filter(
          (task) => task.status === TASK_STATUS_TYPE.PENDING
        );
        break;
      default:
        filteredTasks = [...tasksData];
        break;
    }
    setTasks(filteredTasks);
    setCurrentPage(1);
    setToggleSort(true);
  }, [selectedFilter]);
  const filterTasks = (status: string) => {
    setSelectedFilter(status);
  };

  const handleAddForm = () => {
    setIsModalOpen(!isModalOpen);
    setEditTask(null);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (): void => {
    setToggleSort(!toggleSort);

    const sortedTasks = sortArray(
      toggleSort ? 'latest' : 'oldest',
      [...tasks],
      'dateAdded'
    );
    setTasks(sortedTasks);
  };

  const showSort = () => (
    <button
      className='flex items-center py-2 selected px-0 pr-2'
      onClick={handleSort}
    >
      <svg
        className='w-3 h-3 ml-1.5'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 24 24'
      >
        <path d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z'></path>
      </svg>
    </button>
  );

  const handleSubmitTask = () => {
    setIsModalOpen(false);
  };

  const tasksHeaderProps = {
    filterTasks,
    showSort,
    handleAddForm,
    selectedFilter,
  };

  return (
    <>
      <TasksHeader {...tasksHeaderProps} />

      <div className='bg-white p-5' data-testid='tasks-table'>
        <table className='table-fixed w-full'>
          <tbody>
            {currentTasks.map((task) => (
              <TasksRow
                key={task.id}
                task={task}
                onEditForm={handleAddForm}
                setEditTask={setEditTask}
                setSelectedFilter={setSelectedFilter}
              />
            ))}
          </tbody>
        </table>
      </div>
      {total > 1 && (
        <Pagination
          total={total}
          current={currentPage}
          onSelect={handlePageChange}
        />
      )}
      {isModalOpen && (
        <Modal
          title={editTask ? 'Edit task' : 'Add new task'}
          onClose={() => setIsModalOpen(false)}
        >
          <AddEditTaskForm
            onSubmit={handleSubmitTask}
            task={editTask ? editTask : undefined}
          />
        </Modal>
      )}
    </>
  );
};
export default TasksTable;
