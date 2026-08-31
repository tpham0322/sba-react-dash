import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TaskItem } from "./TaskItem";
import type { Task } from "../../types";

const task: Task = {
  id: "task-1",
  title: "Test Task",
  description: "This is a test task.",
  status: "pending",
  priority: "high",
  dueDate: "12/31/2026",
};

describe("TaskItem", () => {
  it("renders task information", () => {
    render(
      <TaskItem
        task={task}
        onStatusChange={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(
      screen.getByRole("heading", {
        name: "Test Task",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("This is a test task.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("High Priority")
    ).toBeInTheDocument();

    expect(
      screen.getByText("12/31/2026")
    ).toBeInTheDocument();
  });

  it("shows the pending message", () => {
    render(
      <TaskItem
        task={task}
        onStatusChange={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(
      screen.getByText(
        "This task is waiting to be started."
      )
    ).toBeInTheDocument();
  });

  it("shows the completed message for completed tasks", () => {
    const completedTask = {
      ...task,
      status: "completed" as const,
    };

    render(
      <TaskItem
        task={completedTask}
        onStatusChange={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(
      screen.getByText(
        "✓ This task has been completed."
      )
    ).toBeInTheDocument();
  });

  it("calls onStatusChange when status changes", async () => {
    const user = userEvent.setup();

    const onStatusChange = vi.fn();

    render(
      <TaskItem
        task={task}
        onStatusChange={onStatusChange}
        onDelete={vi.fn()}
      />
    );

    await user.selectOptions(
      screen.getByLabelText("Change Status"),
      "completed"
    );

    expect(onStatusChange).toHaveBeenCalledWith(
      "task-1",
      "completed"
    );
  });

  it("calls onDelete when delete is clicked", async () => {
    const user = userEvent.setup();

    const onDelete = vi.fn();

    render(
      <TaskItem
        task={task}
        onStatusChange={vi.fn()}
        onDelete={onDelete}
      />
    );

    await user.click(
      screen.getByRole("button", {
        name: "Delete",
      })
    );

    expect(onDelete).toHaveBeenCalledWith(
      "task-1"
    );
  });
});