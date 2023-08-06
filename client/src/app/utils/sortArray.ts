export const sortArray = (order: string, array: any[], sortBy: string) => {
  const sortedArray = [...array].sort((a, b) => {
    const dateA = new Date(a[sortBy]).getTime();
    const dateB = new Date(b[sortBy]).getTime();
    return order === 'latest' ?dateB - dateA:  dateA - dateB ;
  });

  return sortedArray;
};