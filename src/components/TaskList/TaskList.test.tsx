import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TaskList } from "./TaskList";
import type { Task } from "../../types";

const tasks: Task[] = [
  {
    id: "task-1",
    title: "Task One",
    description: "First task",
    status: "pending",
    priority: "low",
    dueDate: "12/31/2026",
  },
  {
    id: "task-2",
    title: "Task Two",
    description: "Second task",
    status: "completed",
    priority: "high",
    dueDate: "1/1/2027",
  },
];

describe("TaskList", () => {
  it("renders all tasks", () => {
    render(
      <TaskList
        tasks={tasks}
        onStatusChange={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(
      screen.getByRole("heading", {
        name: "Task One",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Task Two",
      })
    ).toBeInTheDocument();
  });

  it("renders an empty state when there are no tasks", () => {
    render(
      <TaskList
        tasks={[]}
        onStatusChange={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(
      screen.getByRole("heading", {
        name: "No tasks found",
      })
    ).toBeInTheDocument();
  });

  it("passes task callbacks to TaskItem", () => {
    const onStatusChange = vi.fn();
    const onDelete = vi.fn();

    render(
      <TaskList
        tasks={tasks}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />
    );

    expect(
      screen.getAllByRole("button", {
        name: "Delete",
      })
    ).toHaveLength(2);
  });
});