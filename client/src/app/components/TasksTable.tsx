import React, { FC, useState } from 'react';
import { Task, TASK_STATUS_TYPE } from '../types/types';
import Pagination from './Pagination';
import TasksRow from './TasksRow';
import Modal from './Modal';
import AddTaskForm from 'app/forms/AddTaskForm';
import TasksHeader from './TasksHeader';

interface ITasksTableProps {
  tasksData: Task[];
}

const TASKS_PER_PAGE = 4;

const TasksTable: FC<ITasksTableProps> = ({ tasksData }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [toggleSort, setToggleSort] = useState<boolean>(false);

  const totalFilteredTasks = tasks.length;
  const total = Math.ceil(totalFilteredTasks / TASKS_PER_PAGE);

  const indexOfLastTask = currentPage * TASKS_PER_PAGE;
  const indexOfFirstTask = indexOfLastTask - TASKS_PER_PAGE;
  let curTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const filterTasks = (status: string) => {
    setSelectedFilter(status);
    let filteredTasks = [...tasks];
    switch (status) {
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
  };

  const handleAddForm = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (): void => {
    setToggleSort((prevValue) => !prevValue);

    const sortedTasks = [...tasksData];
    if (toggleSort) {
      sortedTasks.sort((a, b) =>
        new Date(b.dateAdded).getTime() -
        new Date(a.dateAdded).getTime()
          ? -1
          : 1
      );
    } else {
      sortedTasks.sort((a, b) =>
        new Date(b.dateAdded).getTime() -
        new Date(a.dateAdded).getTime()
          ? 1
          : -1
      );
    }
    setTasks(sortedTasks);
  };

  const showSort = () => (
    <div className='flex items-center ml-2' onClick={handleSort}>
      <svg
        className='w-3 h-3 ml-1.5'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 24 24'
      >
        <path d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z'></path>
      </svg>
    </div>
  );

  const tasksHeaderProps = {
    filterTasks,
    showSort,
    handleAddForm,
    selectedFilter,
  };

  return (
    <>
      <TasksHeader {...tasksHeaderProps} />
      <div className='bg-white p-5'>
        <table className='table-fixed w-full'>
          <tbody>
            {curTasks.map((task) => (
              <TasksRow key={task.id} task={task} />
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
          title='Add new project'
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
        >
          <AddTaskForm onSubmit={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
};
export default TasksTable;
