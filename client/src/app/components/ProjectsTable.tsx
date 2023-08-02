import React, { FC, useState, useEffect } from 'react';
import TasksTable from './TasksTable';
import { Project, Task } from '../types/types';
import { getTasksByProject } from '../api/projects';

interface IProjectsTableProps {
  projects: Project[];
}

const ProjectsTable: FC<IProjectsTableProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const fetchTasks = async () => {
    if (selectedProject) {
      const tasksData = await getTasksByProject(selectedProject.id);
      setTasks(tasksData);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [selectedProject]);

  return (
    <div>
      <table className='table-fixed w-full'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='border px-4 py-2'>Project Name</th>
            <th className='border px-4 py-2'>Time Spent</th>
            <th className='border px-4 py-2'>Client</th>
            <th className='border px-4 py-2'>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td className='border px-4 py-2'>
                <button onClick={() => handleProjectClick(project)}>
                  {project.name}
                </button>
              </td>
              <td className='border px-4 py-2d text-right'>time</td>
              <td className='border px-4 py-2 text-right'>
                {project.client}
              </td>
              <td className='border px-4 py-2 text-right'>
                {project.deadline}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedProject && <TasksTable tasks={tasks} />}
    </div>
  );
};
export default ProjectsTable;
