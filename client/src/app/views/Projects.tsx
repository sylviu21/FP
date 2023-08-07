import React, { useState, useEffect } from 'react';
import ProjectsTable from 'app/components/ProjectsTable';
import Search from 'app/components/Search';
import Modal from 'app/components/Modal';

import { useAppDispatch, useAppSelector } from 'app/custom-hooks';
import AddEditProjectForm from 'app/forms/AddEditProjectForm';
import { setProjects } from 'app/store/slices';
import { Project } from 'app/types/types';
import { sortArray } from 'app/utils';
import {
  getAllProjects,
  getPageProjects,
  searchProject,
} from 'app/api/projects';
import LoadMore from 'app/components/LoadMore';

const Projects = () => {
  const [isAllLoaded, setIstAllLoaded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { projects } = useAppSelector<{ projects: Project[] }>(
    (state) => state.projects
  );

  const { selectedSortOption } = useAppSelector<{
    selectedSortOption: string;
  }>((state) => state.config);

  const dispatch = useAppDispatch();

  const handleAddProject = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getProjectsData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError('');
      const { projects: projectsData, isLastPage } =
        await getPageProjects(page);
      const sortedProjects = sortArray(
        selectedSortOption,
        [...projects, ...projectsData],
        'deadline'
      );

      dispatch(setProjects(sortedProjects));

      setPage((prevPage) => prevPage + 1);
      setIsLastPage(isLastPage);
    } catch {
      setError('Error getting projects');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProjectsData();
  }, []);

  const loadMore = () => getProjectsData();

  const loadAll = async () => {
    setIstAllLoaded(true);
    try {
      setIsLoading(true);
      setError('');

      const projectsData = await getAllProjects();

      const sortedProjects = sortArray(
        selectedSortOption,
        projectsData,
        'deadline'
      );

      dispatch(setProjects(sortedProjects));
    } catch {
      setError('Error getting projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (searchInput: string): Promise<void> => {
    //create api endpoint for search
    const searchData = await searchProject(searchInput);
    dispatch(setProjects(searchData));
    setIstAllLoaded(true);
  };
  const projectTableProps = {
    projectsData: projects,
    isLoading,
    isLastPage,
    error,
  };
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

        <Search onSearch={handleSearch} />
      </div>
      {isModalOpen && (
        <Modal
          title='Add new project'
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
        >
          <AddEditProjectForm
            onSubmit={() => setIsModalOpen(false)}
          />
        </Modal>
      )}

      {projects.length > 0 && (
        <ProjectsTable {...projectTableProps} />
      )}
      {isLastPage || isAllLoaded ? null : (
        <LoadMore loadMore={loadMore} loadAll={loadAll} />
      )}
    </>
  );
};
export default Projects;
