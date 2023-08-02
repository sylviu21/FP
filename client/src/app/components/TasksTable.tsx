import React, {FC} from "react";
import { Task } from "../types/types";

interface ITasksTableProps {
  tasks: Task[];
}
const TasksTable:FC<ITasksTableProps> = ({tasks}) => {

  return (
    <table className="table-fixed w-full mt-10">
      <thead className="bg-gray-200">
        <tr>
          <th className="border px-4 py-2">Task Name</th>
          <th className="border px-4 py-2">Description</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td className="border px-4 py-2d text-right">{task.title}</td>
            <td className="border px-4 py-2d text-right">{task.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default TasksTable