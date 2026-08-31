import { useState } from "react";
import { TaskFilter } from "./components/TaskFilter/TaskFilter";
import { TaskList } from "./components/TaskList/TaskList";
import type {
  Task,
  TaskPriority,
  TaskStatus,
} from "./types";

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Task 1",
    description: "Description 1",
    status: "pending",
    priority: "low",
    dueDate: "12/31/2026",
  },
  {
    id: "task-2",
    title: "Task 2",
    description: "Description 2",
    status: "in-progress",
    priority: "medium",
    dueDate: "1/1/2027",
  },
  {
    id: "task-3",
    title: "Task 3",
    description: "Description 3",
    status: "completed",
    priority: "high",
    dueDate: "1/2/2027",
  },
  {
    id: "task-4",
    title: "Build React Components",
    description:
      "Create reusable React components using TypeScript.",
    status: "pending",
    priority: "high",
    dueDate: "1/5/2027",
  },
  {
    id: "task-5",
    title: "Write Documentation",
    description:
      "Create documentation explaining how the application works.",
    status: "in-progress",
    priority: "medium",
    dueDate: "1/8/2027",
  },
];

function App() {
  const [tasks, setTasks] =
    useState<Task[]>(initialTasks);

  const [statusFilter, setStatusFilter] =
    useState<TaskStatus | undefined>();

  const [priorityFilter, setPriorityFilter] =
    useState<TaskPriority | undefined>();

  const handleFilterChange = (filters: {
    status?: TaskStatus;
    priority?: TaskPriority;
  }) => {
    if ("status" in filters) {
      setStatusFilter(filters.status);
    }

    if ("priority" in filters) {
      setPriorityFilter(filters.priority);
    }
  };

  const handleStatusChange = (
    taskId: string,
    newStatus: TaskStatus
  ) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  };

  const handleDelete = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== taskId
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      !statusFilter ||
      task.status === statusFilter;

    const matchesPriority =
      !priorityFilter ||
      task.priority === priorityFilter;

    return matchesStatus && matchesPriority;
  });

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Task Manager
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your tasks using React and
            TypeScript.
          </p>
        </header>

        {/* Task Summary */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Tasks
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-900">
              {totalTasks}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Pending
            </p>

            <p className="mt-1 text-3xl font-bold text-yellow-600">
              {pendingTasks}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              In Progress
            </p>

            <p className="mt-1 text-3xl font-bold text-blue-600">
              {inProgressTasks}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Completed
            </p>

            <p className="mt-1 text-3xl font-bold text-green-600">
              {completedTasks}
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            Filter Tasks
          </h2>

          <TaskFilter
            onFilterChange={handleFilterChange}
          />
        </section>

        {/* Task List */}
        <section>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Tasks
            </h2>

            <p className="text-sm text-gray-500">
              Showing {filteredTasks.length} of{" "}
              {tasks.length} tasks
            </p>
          </div>

          <TaskList
            tasks={filteredTasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </main>
  );
}

export default App;