import type {
  Task,
  TaskFilterOptions,
  SortDirection,
  SortOption,
  TaskFormData,
} from "../types";

export const filterTasks = (
  tasks: Task[],
  filters: TaskFilterOptions
): Task[] => {
  return tasks.filter((task) => {
    const matchesStatus =
      !filters.status ||
      task.status === filters.status;

    const matchesPriority =
      !filters.priority ||
      task.priority === filters.priority;

    const searchTerm =
      filters.search?.trim().toLowerCase() || "";

    const matchesSearch =
      !searchTerm ||
      task.title.toLowerCase().includes(searchTerm) ||
      task.description
        .toLowerCase()
        .includes(searchTerm);

    return (
      matchesStatus &&
      matchesPriority &&
      matchesSearch
    );
  });
};

const priorityOrder = {
  low: 1,
  medium: 2,
  high: 3,
};

const statusOrder = {
  pending: 1,
  "in-progress": 2,
  completed: 3,
};

export const sortTasks = (
  tasks: Task[],
  sortBy: SortOption,
  direction: SortDirection
): Task[] => {
  const sortedTasks = [...tasks];

  sortedTasks.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;

      case "priority":
        comparison =
          priorityOrder[a.priority] -
          priorityOrder[b.priority];
        break;

      case "dueDate":
        comparison =
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime();
        break;

      case "status":
        comparison =
          statusOrder[a.status] -
          statusOrder[b.status];
        break;
    }

    return direction === "asc"
      ? comparison
      : -comparison;
  });

  return sortedTasks;
};

export const validateTask = (
  task: TaskFormData
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!task.title.trim()) {
    errors.title = "Title is required.";
  } else if (task.title.trim().length < 3) {
    errors.title =
      "Title must be at least 3 characters.";
  }

  if (!task.description.trim()) {
    errors.description =
      "Description is required.";
  }

  if (!task.dueDate) {
    errors.dueDate = "Due date is required.";
  }

  return errors;
};

export const createTaskId = (): string => {
  return `task-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;
};

export const formatDate = (date: string): string => {
  if (!date) {
    return "No due date";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString();
};

export const isOverdue = (task: Task): boolean => {
  if (task.status === "completed") {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(task.dueDate);
  dueDate.setHours(0, 0, 0, 0);

  return dueDate < today;
};