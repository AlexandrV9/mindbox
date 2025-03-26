import { getInitialTodoIds, getInitialTodoMap, getInitialTodoStatusMap } from "../helpers";
import type { Todo, TodoStatusMap } from "~/types";

const mockInitialTodos: Todo[] = [
  { id: "1", text: "Task 1", status: "active" },
  { id: "2", text: "Task 2", status: "completed" },
];

describe("useTodoStore helpers", () => {
  describe("getInitialTodoIds", () => {
    it("should return empty array for empty input", () => {
      expect(getInitialTodoIds()).toEqual([]);
      expect(getInitialTodoIds([])).toEqual([]);
    });

    it("should return array of ids", () => {
      expect(getInitialTodoIds(mockInitialTodos)).toEqual(["1", "2"]);
    });

    it("should handle undefined input", () => {
      expect(getInitialTodoIds(undefined)).toEqual([]);
    });
  });

  describe("getInitialTodoMap", () => {
    it("should return empty Map for empty input", () => {
      expect(getInitialTodoMap()).toEqual(new Map());
      expect(getInitialTodoMap([])).toEqual(new Map());
    });

    it("should create correct todos Map", () => {
      const expected = new Map([
        ["1", { id: "1", text: "Task 1", status: "active" }],
        ["2", { id: "2", text: "Task 2", status: "completed" }],
      ]);

      const result = getInitialTodoMap(mockInitialTodos);
      expect(result).toBeInstanceOf(Map);
      expect(result.size).toBe(2);
      expect(result.get("1")).toEqual(expected.get("1"));
      expect(result.get("2")).toEqual(expected.get("2"));
    });

    it("should handle undefined input", () => {
      expect(getInitialTodoMap(undefined)).toEqual(new Map());
    });
  });

  describe("getInitialTodoStatusMap", () => {
    it("should return empty status map for empty input", () => {
      const expected: TodoStatusMap = {
        all: [],
        active: [],
        completed: [],
      };

      expect(getInitialTodoStatusMap()).toEqual(expected);
      expect(getInitialTodoStatusMap([])).toEqual(expected);
    });

    it("should create correct status map", () => {
      const todos: Todo[] = [
        { id: "1", text: "Task 1", status: "active" },
        { id: "2", text: "Task 2", status: "completed" },
        { id: "3", text: "Task 3", status: "active" },
      ];

      const expected: TodoStatusMap = {
        all: ["1", "2", "3"],
        active: ["1", "3"],
        completed: ["2"],
      };

      expect(getInitialTodoStatusMap(todos)).toEqual(expected);
    });

    it("should maintain insertion order in all array", () => {
      expect(getInitialTodoStatusMap(mockInitialTodos).all).toEqual(["1", "2"]);
    });

    it("should handle undefined input", () => {
      const expected: TodoStatusMap = {
        all: [],
        active: [],
        completed: [],
      };
      expect(getInitialTodoStatusMap(undefined)).toEqual(expected);
    });
  });
});
