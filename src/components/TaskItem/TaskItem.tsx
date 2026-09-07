import type {
  TaskItemProps,
  TaskStatus,
} from "../../types";

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onStatusChange,
  onDelete,
  onEdit,
  onDragStart,
  onDrop,
}) => {
  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onStatusChange(
      task.id,
      event.target.value as TaskStatus
    );
  };

  const statusLabel = {
    pending: "Pending",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  const priorityLabel = {
    low: "Low",
    medium: "Medium",
    high: "High",
  };

  const statusStyles = {
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    "in-progress":
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    completed:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  const priorityStyles = {
    low:
      "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
    medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    high:
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  const borderStyles = {
    pending: "border-l-yellow-500",
    "in-progress": "border-l-blue-500",
    completed: "border-l-green-500",
  };

  return (
    <article
      draggable
      onDragStart={() => onDragStart(task.id)}
      onDragOver={(event) =>
        event.preventDefault()
      }
      onDrop={() => onDrop(task.id)}
      className={`cursor-grab rounded-xl border border-gray-200 border-l-4 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 ${borderStyles[task.status]}`}
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {task.title}
          </h2>

          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[task.status]}`}
          >
            {statusLabel[task.status]}
          </span>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${priorityStyles[task.priority]}`}
        >
          {priorityLabel[task.priority]} Priority
        </span>
      </div>

      <p className="mt-4 text-gray-600 dark:text-gray-300">
        {task.description}
      </p>

      <div className="mt-4 flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:gap-6 dark:text-gray-300">
        <span>
          <strong>Priority:</strong>{" "}
          {priorityLabel[task.priority]}
        </span>

        <span>
          <strong>Due:</strong> {task.dueDate}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-700">
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`status-${task.id}`}
            className="text-sm font-semibold text-gray-700 dark:text-gray-200"
          >
            Change Status
          </label>

          <select
            id={`status-${task.id}`}
            value={task.status}
            onChange={handleStatusChange}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">
              In Progress
            </option>
            <option value="completed">
              Completed
            </option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
        >
          Delete
        </button>
      </div>

      <p className="mt-3 text-xs text-gray-400">
        Drag this task to reorder
      </p>
    </article>
  );
};