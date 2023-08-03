export const setStatusLabelColor = (status: string): string => {
  switch (status) {
    case 'Done':
      return 'bg-green-400';
    case 'In Progress':
      return 'bg-indigo-600';
    case 'Pending':
      return 'bg-yellow-400';
    default:
      return 'bg-indigo-400';
  }
}