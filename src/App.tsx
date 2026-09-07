import { useEffect, useMemo, useState } from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { TaskForm } from "./components/TaskForm/TaskForm";
import type {
  Task,
  TaskFilterOptions,
  TaskFormData,
  SortOption,
  SortDirection,
} from "./types";
import {
  createTaskId,
  filterTasks,
  sortTasks,
} from "./utils/taskUtils";

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Task 1",
    description: "Description 1",
    status: "pending",
    priority: "low",
    dueDate: "2026-12-31",
  },
  {
    id: "task-2",
    title: "Task 2",
    description: "Description 2",
    status: "in-progress",
    priority: "medium",
    dueDate: "2027-01-01",
  },
  {
    id: "task-3",
    title: "Task 3",
    description: "Description 3",
    status: "completed",
    priority: "high",
    dueDate: "2027-01-02",
  },
  {
    id: "task-4",
    title: "Build React Components",
    description:
      "Create reusable React components using TypeScript.",
    status: "pending",
    priority: "high",
    dueDate: "2027-01-05",
  },
  {
    id: "task-5",
    title: "Write Documentation",
    description:
      "Create documentation explaining how the application works.",
    status: "in-progress",
    priority: "medium",
    dueDate: "2027-01-08",
  },
];

const STORAGE_KEY = "task-dashboard-tasks";
const THEME_KEY = "task-dashboard-theme";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks =
      localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) {
      return initialTasks;
    }

    try {
      return JSON.parse(savedTasks);
    } catch {
      return initialTasks;
    }
  });

  const [filters, setFilters] =
    useState<TaskFilterOptions>({});

  const [sortBy, setSortBy] =
    useState<SortOption>("dueDate");

  const [sortDirection, setSortDirection] =
    useState<SortDirection>("asc");

  const [showForm, setShowForm] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState<Task | undefined>();

  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem(THEME_KEY) === "dark"
    );
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    );
  }, [tasks]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      darkMode
    );

    localStorage.setItem(
      THEME_KEY,
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const filteredTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filters);

    return sortTasks(
      filtered,
      sortBy,
      sortDirection
    );
  }, [
    tasks,
    filters,
    sortBy,
    sortDirection,
  ]);

  const handleStatusChange = (
    taskId: string,
    newStatus: Task["status"]
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

  const handleAddTask = () => {
    setEditingTask(undefined);
    setShowForm(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormSubmit = (
    taskData: TaskFormData
  ) => {
    if (editingTask) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...taskData,
              }
            : task
        )
      );
    } else {
      const newTask: Task = {
        id: createTaskId(),
        ...taskData,
      };

      setTasks((currentTasks) => [
        ...currentTasks,
        newTask,
      ]);
    }

    setShowForm(false);
    setEditingTask(undefined);
  };

  const handleReorder = (
    draggedId: string,
    targetId: string
  ) => {
    setTasks((currentTasks) => {
      const draggedIndex =
        currentTasks.findIndex(
          (task) => task.id === draggedId
        );

      const targetIndex =
        currentTasks.findIndex(
          (task) => task.id === targetId
        );

      if (
        draggedIndex === -1 ||
        targetIndex === -1
      ) {
        return currentTasks;
      }

      const reordered = [...currentTasks];

      const [draggedTask] =
        reordered.splice(draggedIndex, 1);

      reordered.splice(
        targetIndex,
        0,
        draggedTask
      );

      return reordered;
    });
  };

  const handleExport = () => {
    const data = JSON.stringify(tasks, null, 2);

    const blob = new Blob([data], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "tasks.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleImport = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
      try {
        const importedTasks = JSON.parse(
          loadEvent.target?.result as string
        );

        if (!Array.isArray(importedTasks)) {
          throw new Error(
            "Invalid task data"
          );
        }

        setTasks(importedTasks);
      } catch {
        alert(
          "Unable to import tasks. Please select a valid JSON task file."
        );
      }
    };

    reader.readAsText(file);

    event.target.value = "";
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleSortChange = (
    newSortBy: SortOption,
    newDirection: SortDirection
  ) => {
    setSortBy(newSortBy);
    setSortDirection(newDirection);
  };

  return (
    <>
      {showForm ? (
        <main className="min-h-screen bg-gray-100 px-4 py-8 dark:bg-gray-950">
          <div className="mx-auto max-w-3xl">
            <TaskForm
              task={editingTask}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(undefined);
              }}
            />
          </div>
        </main>
      ) : (
        <Dashboard
          tasks={tasks}
          filteredTasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onReorder={handleReorder}
          filters={filters}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onFilterChange={setFilters}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}
          onAddTask={handleAddTask}
          onExport={handleExport}
          onImport={handleImport}
          darkMode={darkMode}
          onToggleDarkMode={() =>
            setDarkMode((current) => !current)
          }
        />
      )}
    </>
  );
}

export default App;