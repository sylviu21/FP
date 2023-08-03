import React, { useState, useEffect } from 'react';
import ProjectsTable from 'app/components/ProjectsTable';
import Modal from 'app/components/Modal';
import AddEntryForm from 'app/forms/AddProjectForm';
import { getAllProjects } from 'app/api/projects';
import { useAppSelector, useAppDispatch } from '../utils/';
import { setProjects } from 'app/store/slices';

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projects } = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();

  const handleAddEntryClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getProjectsData = async (): Promise<void> => {
    try {
      const projectsData = await getAllProjects();
      dispatch(setProjects(projectsData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectsData();
  }, []);

  return (
    <>
      <div className='flex items-center my-6'>
        <div className='w-1/2'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleAddEntryClick}
          >
            Add Project
          </button>
        </div>

        <div className='w-1/2 flex justify-end'>
          <form>
            <input
              className='border rounded-full py-2 px-4'
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2'
              type='submit'
            >
              Search
            </button>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title='Add entry'
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
        >
          <AddEntryForm onSubmit={() => setIsModalOpen(false)} />
        </Modal>
      )}

      {projects.length > 0 && (
        <ProjectsTable projectsData={projects} />
      )}
    </>
  );
};
export default Projects;
