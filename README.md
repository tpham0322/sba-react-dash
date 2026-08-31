# Task Manager

A task management application built with React and TypeScript. This project demonstrates dynamic list rendering, unique React keys, conditional rendering, filtering, component composition, and event handling.

## Features

- Display a list of tasks
- Filter tasks by status
- Filter tasks by priority
- Change task status
- Delete tasks
- Display task priority
- Display task due dates
- Display different visual states based on task status
- Use unique keys when rendering lists
- TypeScript interfaces for type safety
- Responsive design with Tailwind CSS
- Component testing with Vitest and React Testing Library

## Technologies

- React
- TypeScript
- Vite
- Tailwind CSS
- Vitest
- React Testing Library
- Testing Library User Event

## Project Structure

```text
src/
├── components/
│   ├── TaskFilter/
│   │   ├── TaskFilter.tsx
│   │   └── TaskFilter.test.tsx
│   ├── TaskItem/
│   │   ├── TaskItem.tsx
│   │   └── TaskItem.test.tsx
│   └── TaskList/
│       ├── TaskList.tsx
│       └── TaskList.test.tsx
├── test/
│   └── setup.ts
├── types/
│   └── index.ts
├── App.tsx
├── index.css
└── main.tsx
```

## Components

### TaskFilter

The TaskFilter component provides dropdown menus that allow users to filter tasks by status and priority.

Available statuses:

- Pending
- In Progress
- Completed

Available priorities:

- Low
- Medium
- High

The component sends the selected filters to the parent component through the onFilterChange callback.

### TaskItem

The TaskItem component displays information for an individual task.

It displays:

- Task title
- Description
- Status
- Priority
- Due date
- Status control
- Delete button

The component also uses conditional rendering to display different messages based on the task's current status.

### TaskList

The TaskList component renders the collection of tasks.

Each task is rendered using the TaskItem component.

Each task uses its unique ID as the React key. This ensures that React can correctly identify each item in the list.

## Filtering

The application supports filtering by both status and priority.

The filtered task list is generated in App.tsx.

The application checks whether each task matches the selected status and priority filters. If no filter is selected, the corresponding condition is ignored.

When both filters are selected, a task must match both the selected status and priority.

## Status Changes

Task status is managed using React's useState hook.

When a task's status changes, the application creates a new task array and updates only the task with the matching ID.

This keeps the state immutable and ensures that React properly updates the interface.

## Task Deletion

Tasks are deleted by filtering the task array.

The task with the matching ID is removed from the list and the interface updates automatically.

## Conditional Rendering

The application displays different content based on the task status.

Completed tasks display a completion message.

Pending tasks display a message indicating that the task is waiting to be started.

In-progress tasks display a message indicating that the task is currently being worked on.

The application also changes the visual styling of tasks based on their status and priority.

## TypeScript

The application uses TypeScript interfaces and union types to provide type safety.

TaskStatus supports three possible values:

- pending
- in-progress
- completed

TaskPriority supports three possible values:

- low
- medium
- high

The Task interface defines the required properties for each task:

- id
- title
- description
- status
- priority
- dueDate

The component props are also typed using TypeScript interfaces.

## Testing

The project uses Vitest and React Testing Library for component testing.

Tests are provided for:

- TaskFilter
- TaskItem
- TaskList

The current test suite contains 11 tests across 3 test files.

### Run Tests

Run all tests in watch mode:

npm run test

Run all tests once:

npm run test -- --run

### Test Coverage

The tests verify:

- Components render correctly
- Task information is displayed
- Status filters trigger the correct callback
- Priority filters trigger the correct callback
- Status changes trigger the correct callback
- Task deletion triggers the correct callback
- Conditional content is displayed
- Empty task lists display the correct message
- Multiple tasks are rendered

## Installation

Install the project dependencies:

npm install

## Running the Application

Start the development server:

npm run dev

Vite will provide a local development URL where the application can be viewed.

## Building the Application

Create a production build:

npm run build

## Linting

Run ESLint:

npm run lint

## Assignment Requirements

This project demonstrates the following concepts from the lab:

- Dynamic list rendering
- Unique React keys
- Conditional rendering
- Filtering
- TypeScript interfaces
- Component composition
- Prop handling
- Event handling
- Visual feedback
- Responsive design
- Component testing

## Future Improvements

Possible future improvements include:

- Add new tasks through a form
- Sort tasks by due date
- Edit existing tasks
- Move tasks up and down the list
- Store tasks using local storage
- Add task search functionality
- Add task categories
- Add task completion dates

## Author

Truong Pham
