import { TaskItem } from "../TaskItem/TaskItem";
import type { TaskListProps } from "../../types";

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onStatusChange,
  onDelete,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
        <h2 className="text-xl font-bold text-gray-900">
          No tasks found
        </h2>

        <p className="mt-2 text-gray-600">
          There are no tasks that match the selected
          filters.
        </p>
      </div>
    );
  }

  return (
    <section className="grid gap-5">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};