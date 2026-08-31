import type {
  TaskFilterProps,
  TaskPriority,
  TaskStatus,
} from "../../types";

export const TaskFilter: React.FC<TaskFilterProps> = ({
  onFilterChange,
}) => {
  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value as TaskStatus | "";

    onFilterChange({
      status: value === "" ? undefined : value,
    });
  };

  const handlePriorityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value as TaskPriority | "";

    onFilterChange({
      priority: value === "" ? undefined : value,
    });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex flex-1 flex-col gap-2">
        <label
          htmlFor="status-filter"
          className="font-semibold text-gray-700"
        >
          Status
        </label>

        <select
          id="status-filter"
          defaultValue=""
          onChange={handleStatusChange}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <label
          htmlFor="priority-filter"
          className="font-semibold text-gray-700"
        >
          Priority
        </label>

        <select
          id="priority-filter"
          defaultValue=""
          onChange={handlePriorityChange}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
};