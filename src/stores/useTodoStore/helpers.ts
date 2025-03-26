import { Todo, TodosMap, TodoStatusMap } from "~/types";

export const getInitialTodoIds = (todos: Todo[] = []) => {
  return todos?.map((item) => item.id) ?? [];
};

export const getInitialTodoMap = (todos: Todo[] = []): TodosMap => {
  const map = new Map();
  todos.forEach((todo) => map.set(todo.id, todo));
  return map;
};

export const getInitialTodoStatusMap = (todos: Todo[] = []) => {
  return todos.reduce(
    (acc, item) => {
      acc[item.status].push(item.id);
      acc.all.push(item.id);

      return acc;
    },
    { all: [], active: [], completed: [] } as TodoStatusMap
  );
};
