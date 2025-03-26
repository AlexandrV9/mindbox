import { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";
import { useTodoStore } from "..";
import { Todo } from "~/types";

const wrapper = ({ children }: { children: ReactNode }) => <>{children}</>;

export const renderTodoStore = (initialTodos?: Todo[]) => {
  return renderHook(() => useTodoStore({ initialTodos }), { wrapper });
};

const mockInitialTodos: Todo[] = [
  { id: "1", text: "Test 1", status: "active" },
  { id: "2", text: "Test 2", status: "completed" },
];

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

describe("useTodoStore", () => {
  beforeEach(() => {
    (uuidv4 as jest.Mock).mockReturnValue("mocked-uuid");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should initialize with empty state", () => {
    const { result } = renderTodoStore();

    expect(result.current.allTodoIds).toEqual([]);
    expect(result.current.todoMap).toEqual(new Map());
    expect(result.current.todoStatusMap).toEqual({
      all: [],
      active: [],
      completed: [],
    });
  });

  test("should initialize with provided todos", () => {
    const { result } = renderTodoStore(mockInitialTodos);

    expect(result.current.allTodoIds).toEqual(["1", "2"]);
    expect(result.current.todoMap).toEqual(
      new Map([
        ["1", mockInitialTodos[0]],
        ["2", mockInitialTodos[1]],
      ])
    );
    expect(result.current.todoStatusMap).toEqual({
      all: ["1", "2"],
      active: ["1"],
      completed: ["2"],
    });
  });

  test("should add new todo", () => {
    const { result } = renderTodoStore();

    act(() => {
      result.current.addTodo("New task");
    });

    expect(result.current.allTodoIds).toEqual(["mocked-uuid"]);
    expect(result.current.todoMap).toEqual(
      new Map([
        [
          "mocked-uuid",
          {
            id: "mocked-uuid",
            text: "New task",
            status: "active",
          },
        ],
      ])
    );
    expect(result.current.todoStatusMap).toEqual({
      all: ["mocked-uuid"],
      active: ["mocked-uuid"],
      completed: [],
    });
  });

  test("should update todo status", () => {
    const { result } = renderTodoStore(mockInitialTodos);

    act(() => {
      result.current.updateTodoById("1", { status: "completed" });
    });

    const updatedTodo = result.current.todoMap.get("1");
    expect(updatedTodo?.status).toBe("completed");

    expect(result.current.todoStatusMap).toEqual({
      all: ["1", "2"],
      active: [],
      completed: ["1", "2"],
    });
  });

  test("should not update non-existent todo", () => {
    const { result } = renderTodoStore();

    act(() => {
      result.current.updateTodoById("non-existent", { text: "Updated" });
    });

    expect(result.current.todoMap).toEqual(new Map());
  });

  test("should delete todo", () => {
    const { result } = renderTodoStore(mockInitialTodos);

    act(() => {
      result.current.deleteTodoById("1");
    });

    expect(result.current.allTodoIds).toEqual(["2"]);
    expect(result.current.todoMap).toEqual(new Map([["2", mockInitialTodos[1]]]));
    expect(result.current.todoStatusMap).toEqual({
      all: ["2"],
      active: [],
      completed: ["2"],
    });
  });

  test("should delete multiple todos", () => {
    const newTask: Todo = { id: "3", status: "active", text: "New task 3" };
    const { result } = renderTodoStore([...mockInitialTodos, newTask]);

    act(() => {
      result.current.deleteTodos(["1", "2"]);
    });

    expect(result.current.allTodoIds).toEqual(["3"]);
    expect(result.current.todoMap).toEqual(new Map([["3", newTask]]));
    expect(result.current.todoStatusMap).toEqual({
      all: ["3"],
      active: ["3"],
      completed: [],
    });
  });

  test("should handle updating non-status fields", () => {
    const { result } = renderTodoStore(mockInitialTodos);

    act(() => {
      result.current.updateTodoById("1", { text: "Updated text" });
    });

    const updatedTodo = result.current.todoMap.get("1");
    expect(updatedTodo?.text).toBe("Updated text");
    expect(updatedTodo?.status).toBe("active"); // Статус не должен измениться

    expect(result.current.todoStatusMap).toEqual({
      all: ["1", "2"],
      active: ["1"],
      completed: ["2"],
    });
  });
});
