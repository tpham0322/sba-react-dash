import type {
  TaskItemProps,
  TaskStatus,
} from "../../types";

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onStatusChange,
  onDelete,
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
    pending: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  const priorityStyles = {
    low: "bg-sky-100 text-sky-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const borderStyles = {
    pending: "border-l-yellow-500",
    "in-progress": "border-l-blue-500",
    completed: "border-l-green-500",
  };

  return (
    <article
      className={`rounded-xl border border-gray-200 border-l-4 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${borderStyles[task.status]}`}
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
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

      <p className="mt-4 text-gray-600">
        {task.description}
      </p>

      <div className="mt-4 flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:gap-6">
        <span>
          <strong>Priority:</strong>{" "}
          {priorityLabel[task.priority]}
        </span>

        <span>
          <strong>Due:</strong> {task.dueDate}
        </span>
      </div>

      {task.status === "completed" && (
        <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
          ✓ This task has been completed.
        </div>
      )}

      {task.status === "pending" && (
        <div className="mt-4 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-700">
          This task is waiting to be started.
        </div>
      )}

      {task.status === "in-progress" && (
        <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
          This task is currently in progress.
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-end gap-3 border-t border-gray-200 pt-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`status-${task.id}`}
            className="text-sm font-semibold text-gray-700"
          >
            Change Status
          </label>

          <select
            id={`status-${task.id}`}
            value={task.status}
            onChange={handleStatusChange}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="pending">
              Pending
            </option>

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
          onClick={() => onDelete(task.id)}
          className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Delete
        </button>
      </div>
    </article>
  );
};