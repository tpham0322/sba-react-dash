import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TaskFilter } from "./TaskFilter";

describe("TaskFilter", () => {
  it("renders the search, filter, and sorting controls", () => {
    render(
      <TaskFilter
        filters={{}}
        sortBy="dueDate"
        sortDirection="asc"
        onFilterChange={vi.fn()}
        onSortChange={vi.fn()}
        onClearFilters={vi.fn()}
      />
    );

    expect(
      screen.getByLabelText("Search Tasks")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Status")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Priority")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Sort By")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Direction")
    ).toBeInTheDocument();
  });
});