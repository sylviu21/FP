import React, { useState, useEffect } from 'react';
import ProjectsTable from '../components/ProjectsTable';
import Modal from '../components/Modal';
import AddEntryForm from '../forms/AddEntryForm';
import { getAll } from '../api/projects';
import { Project } from '../types/types';

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const handleAddEntryClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getProjectsData = async (): Promise<void> => {
    const projectsData = await getAll();
    console.log(projectsData);
    setProjects(projectsData);
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

      <ProjectsTable projects={projects} />
    </>
  );
};
export default Projects;
