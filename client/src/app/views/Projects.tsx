import React, { useState, useEffect } from 'react';
import ProjectsTable from 'app/components/ProjectsTable';
import Modal from 'app/components/Modal';
import { getAllProjects } from 'app/api/projects';
import { useAppSelector, useAppDispatch } from 'app/custom-hooks';
import { setProjects } from 'app/store/slices';
import AddProjectForm from 'app/forms/AddProjectForm';

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projects } = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();

  const handleAddProject = () => {
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
            onClick={handleAddProject}
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
          title='Add new project'
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
        >
          <AddProjectForm onSubmit={() => setIsModalOpen(false)} />
        </Modal>
      )}

      {projects.length > 0 && (
        <ProjectsTable projectsData={projects} />
      )}
    </>
  );
};
export default Projects;
