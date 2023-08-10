import { useSelector } from 'react-redux';
import { RootState } from '../store'; 
import { Project } from 'app/types/types'; 

const useSelectedProject = (projectId: number): Project => {
  const selectedProject = useSelector((state: RootState) => {
    return state.projects.projects.find((project:Project) => project.id === projectId);
  });

  return selectedProject!;
};
export default useSelectedProject