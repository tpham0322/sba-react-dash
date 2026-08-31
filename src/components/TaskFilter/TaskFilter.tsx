import type {
  TaskFilterProps,
  TaskPriority,
  TaskStatus,
  SortOption,
  SortDirection,
} from "../../types";

export const TaskFilter: React.FC<TaskFilterProps> = ({
  filters,
  sortBy,
  sortDirection,
  onFilterChange,
  onSortChange,
  onClearFilters,
}) => {
  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value as
      | TaskStatus
      | "";

    onFilterChange({
      ...filters,
      status:
        value === "" ? undefined : value,
    });
  };

  const handlePriorityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value as
      | TaskPriority
      | "";

    onFilterChange({
      ...filters,
      priority:
        value === "" ? undefined : value,
    });
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFilterChange({
      ...filters,
      search: event.target.value,
    });
  };

  const handleSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onSortChange(
      event.target.value as SortOption,
      sortDirection
    );
  };

  const handleDirectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onSortChange(
      sortBy,
      event.target.value as SortDirection
    );
  };

  const hasActiveFilters =
    Boolean(filters.search?.trim()) ||
    Boolean(filters.status) ||
    Boolean(filters.priority);


  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="task-search"
          className="mb-2 block font-semibold text-gray-700 dark:text-gray-200"
        >
          Search Tasks
        </label>

        <input
          id="task-search"
          type="search"
          value={filters.search || ""}
          onChange={handleSearchChange}
          placeholder="Search by title or description..."
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label
            htmlFor="status-filter"
            className="mb-2 block font-semibold text-gray-700 dark:text-gray-200"
          >
            Status
          </label>

          <select
            id="status-filter"
            value={filters.status || ""}
            onChange={handleStatusChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">
              In Progress
            </option>
            <option value="completed">
              Completed
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="priority-filter"
            className="mb-2 block font-semibold text-gray-700 dark:text-gray-200"
          >
            Priority
          </label>

          <select
            id="priority-filter"
            value={filters.priority || ""}
            onChange={handlePriorityChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="sort-filter"
            className="mb-2 block font-semibold text-gray-700 dark:text-gray-200"
          >
            Sort By
          </label>

          <select
            id="sort-filter"
            value={sortBy}
            onChange={handleSortChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="title">Title</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
            <option value="status">Status</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="sort-direction"
            className="mb-2 block font-semibold text-gray-700 dark:text-gray-200"
          >
            Direction
          </label>

          <select
            id="sort-direction"
            value={sortDirection}
            onChange={handleDirectionChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="asc">Ascending</option>
            <option value="desc">
              Descending
            </option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Active filters:
          </span>

          {filters.search && (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Search: {filters.search}
            </span>
          )}

          {filters.status && (
            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              Status: {filters.status}
            </span>
          )}

          {filters.priority && (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              Priority: {filters.priority}
            </span>
          )}

          <button
            type="button"
            onClick={onClearFilters}
            className="rounded-lg bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};