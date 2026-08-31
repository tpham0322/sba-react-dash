import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TaskFilter } from "./TaskFilter";

describe("TaskFilter", () => {
  it("renders status and priority filters", () => {
    render(
      <TaskFilter onFilterChange={vi.fn()} />
    );

    expect(
      screen.getByLabelText("Status")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Priority")
    ).toBeInTheDocument();
  });

  it("calls onFilterChange when status changes", async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();

    render(
      <TaskFilter
        onFilterChange={onFilterChange}
      />
    );

    await user.selectOptions(
      screen.getByLabelText("Status"),
      "completed"
    );

    expect(onFilterChange).toHaveBeenCalledWith({
      status: "completed",
    });
  });

  it("calls onFilterChange when priority changes", async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();

    render(
      <TaskFilter
        onFilterChange={onFilterChange}
      />
    );

    await user.selectOptions(
      screen.getByLabelText("Priority"),
      "high"
    );

    expect(onFilterChange).toHaveBeenCalledWith({
      priority: "high",
    });
  });
});