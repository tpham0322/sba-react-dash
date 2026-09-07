import { TaskFilter } from "../TaskFilter/TaskFilter";
import { TaskList } from "../TaskList/TaskList";
import type { DashboardProps } from "../../types";
import { isOverdue } from "../../utils/taskUtils";

export const Dashboard: React.FC<DashboardProps> = ({
  tasks,
  filteredTasks,
  onStatusChange,
  onDelete,
  onEdit,
  onReorder,
  filters,
  sortBy,
  sortDirection,
  onFilterChange,
  onSortChange,
  onClearFilters,
  onAddTask,
  onExport,
  onImport,
  darkMode,
  onToggleDarkMode,
}) => {
  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "high"
  ).length;

  const overdueTasks = tasks.filter(isOverdue).length;

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 transition-colors dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Task Dashboard
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage, organize, and track your tasks.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="rounded-lg bg-gray-800 px-4 py-2 font-semibold text-white transition hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>

            <button
              type="button"
              onClick={onAddTask}
              className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              + Add Task
            </button>
          </div>
        </header>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Tasks
            </p>
            <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Pending
            </p>
            <p className="mt-1 text-3xl font-bold text-yellow-600">
              {pendingTasks}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              In Progress
            </p>
            <p className="mt-1 text-3xl font-bold text-blue-600">
              {inProgressTasks}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Completed
            </p>
            <p className="mt-1 text-3xl font-bold text-green-600">
              {completedTasks}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              High Priority
            </p>
            <p className="mt-1 text-3xl font-bold text-red-600">
              {highPriorityTasks}
            </p>
          </div>
        </section>

        {overdueTasks > 0 && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            <strong>
              {overdueTasks} overdue{" "}
              {overdueTasks === 1
                ? "task"
                : "tasks"}
            </strong>{" "}
            need your attention.
          </div>
        )}

        <section className="mb-8 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Filter & Sort
            </h2>

            <div className="flex gap-2">
              <label
                htmlFor="import-tasks"
                className="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
              >
                Import
              </label>

              <input
                id="import-tasks"
                type="file"
                accept=".json"
                onChange={onImport}
                className="hidden"
              />

              <button
                type="button"
                onClick={onExport}
                className="rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
              >
                Export
              </button>
            </div>
          </div>

          <TaskFilter
            filters={filters}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onFilterChange={onFilterChange}
            onSortChange={onSortChange}
            onClearFilters={onClearFilters}
          />
        </section>

        <section>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Tasks
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredTasks.length} of{" "}
              {tasks.length} tasks
            </p>
          </div>

          <TaskList
            tasks={filteredTasks}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            onEdit={onEdit}
            onReorder={onReorder}
          />
        </section>
      </div>
    </main>
  );
};