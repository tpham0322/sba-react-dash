import { useState } from "react";
import type {
  TaskFormProps,
  TaskFormData,
  TaskStatus,
  TaskPriority,
} from "../../types";
import { validateTask } from "../../utils/taskUtils";

const defaultForm: TaskFormData = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: "",
};

export const TaskForm: React.FC<TaskFormProps> = ({
  task,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] =
    useState<TaskFormData>(
      task
        ? {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate,
          }
        : defaultForm
    );

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const validationErrors =
      validateTask(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800"
    >
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        {task ? "Edit Task" : "Add New Task"}
      </h2>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block font-semibold text-gray-700 dark:text-gray-200"
          >
            Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-600">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block font-semibold text-gray-700 dark:text-gray-200"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the task..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="status"
              className="mb-2 block font-semibold text-gray-700 dark:text-gray-200"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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

          <div>
            <label
              htmlFor="priority"
              className="mb-2 block font-semibold text-gray-700 dark:text-gray-200"
            >
              Priority
            </label>

            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="mb-2 block font-semibold text-gray-700 dark:text-gray-200"
            >
              Due Date
            </label>

            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />

            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.dueDate}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-gray-200 px-5 py-2 font-semibold text-gray-700 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            {task ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </div>
    </form>
  );
};