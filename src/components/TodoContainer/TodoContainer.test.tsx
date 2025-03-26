import { render, screen, fireEvent, act } from "@testing-library/react";
import { useTodoStore } from "~/stores";
import { mockData } from "./mocks";
import { TodoContainer } from ".";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom/extend-expect";

jest.mock("~/stores", () => ({
  useTodoStore: jest.fn(),
}));

jest.mock("../TodoInput", () => ({
  TodoInput: ({ onAddTodo }: { onAddTodo: (text: string) => void }) => (
    <input data-testid="todo-input" onChange={(e) => onAddTodo(e.target.value)} />
  ),
}));

jest.mock("../TodoList", () => ({
  TodoList: () => <div data-testid="todo-list" />,
}));

jest.mock("../TodoStatusFilter", () => ({
  TodoStatusFilter: ({ onChangeStatus }: { onChangeStatus: (status: string) => void }) => (
    <div data-testid="status-filter" onClick={() => onChangeStatus("active")} />
  ),
}));

describe("TodoContainer", () => {
  const mockStore = {
    todoMap: {
      "1": { id: "1", text: "Task 1", status: "active" },
      "2": { id: "2", text: "Task 2", status: "completed" },
    },
    todoStatusMap: {
      all: ["1", "2"],
      active: ["1"],
      completed: ["2"],
    },
    addTodo: jest.fn(),
    updateTodoById: jest.fn(),
    deleteTodos: jest.fn(),
  };

  beforeEach(() => {
    (useTodoStore as jest.Mock).mockReturnValue(mockStore);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly with initial data", () => {
    render(<TodoContainer />);

    expect(screen.getByText("todos")).toBeInTheDocument();
    expect(screen.getByTestId("todo-input")).toBeInTheDocument();
    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
    expect(screen.getByTestId("status-filter")).toBeInTheDocument();
    expect(screen.getByText("1 items left")).toBeInTheDocument();
    expect(screen.getByText("clear completed")).toBeInTheDocument();
  });

  it("should handle adding new todo", async () => {
    render(<TodoContainer />);

    const input = screen.getByTestId("todo-input");

    await act(async () => {
      fireEvent.change(input, { target: { value: "New Task" } });
    });

    expect(mockStore.addTodo).toHaveBeenCalledWith("New Task");
  });

  it("should handle changing filter status", async () => {
    render(<TodoContainer />);

    const filter = screen.getByTestId("status-filter");
    await act(async () => {
      fireEvent.click(filter);
    });

    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
  });

  it("should handle clearing completed todos", async () => {
    const mockStoreWithCompleted = {
      ...mockStore,
      todoStatusMap: {
        ...mockStore.todoStatusMap,
        completed: ["2", "3"],
      },
    };
    (useTodoStore as jest.Mock).mockReturnValue(mockStoreWithCompleted);

    render(<TodoContainer />);

    const clearButton = screen.getByRole("button", { name: /clear completed/i });

    await act(async () => {
      await userEvent.click(clearButton);
    });

    expect(mockStoreWithCompleted.deleteTodos).toHaveBeenCalledWith(["2", "3"]);
  });

  it("should display correct items count", () => {
    (useTodoStore as jest.Mock).mockReturnValue({
      ...mockStore,
      todoStatusMap: {
        ...mockStore.todoStatusMap,
        active: Array(100)
          .fill("0")
          .map((_, i) => `${i}`),
      },
    });

    render(<TodoContainer />);
    expect(screen.getByText("99+ items left")).toBeInTheDocument();
  });

  it("should initialize with mock data", () => {
    render(<TodoContainer />);
    expect(useTodoStore).toHaveBeenCalledWith({
      initialTodos: mockData,
    });
  });
});
