export type TaskStatus =
  | "pending"
  | "in-progress"
  | "completed";

export type TaskPriority =
  | "low"
  | "medium"
  | "high";

export type SortOption =
  | "title"
  | "priority"
  | "dueDate"
  | "status";

export type SortDirection = "asc" | "desc";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export interface TaskFilterOptions {
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
}

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (
    taskId: string,
    newStatus: TaskStatus
  ) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onReorder: (draggedId: string, targetId: string) => void;
}

export interface TaskItemProps {
  task: Task;
  onStatusChange: (
    taskId: string,
    newStatus: TaskStatus
  ) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDragStart: (taskId: string) => void;
  onDrop: (taskId: string) => void;
}

export interface TaskFilterProps {
  filters: TaskFilterOptions;
  sortBy: SortOption;
  sortDirection: SortDirection;
  onFilterChange: (filters: TaskFilterOptions) => void;
  onSortChange: (
    sortBy: SortOption,
    sortDirection: SortDirection
  ) => void;
  onClearFilters: () => void;
}

export interface TaskFormProps {
  task?: Task;
  onSubmit: (taskData: TaskFormData) => void;
  onCancel: () => void;
}

export interface DashboardProps {
  tasks: Task[];
  filteredTasks: Task[];
  onStatusChange: (
    taskId: string,
    newStatus: TaskStatus
  ) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onReorder: (draggedId: string, targetId: string) => void;
  filters: TaskFilterOptions;
  sortBy: SortOption;
  sortDirection: SortDirection;
  onFilterChange: (filters: TaskFilterOptions) => void;
  onSortChange: (
    sortBy: SortOption,
    sortDirection: SortDirection
  ) => void;
  onClearFilters: () => void;
  onAddTask: () => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}