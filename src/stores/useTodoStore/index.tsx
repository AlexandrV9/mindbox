import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { ShowTodoStatus, Todo, TodosMap, TodoStatusMap } from "~/types";
import { getInitialTodoIds, getInitialTodoMap, getInitialTodoStatusMap } from "./helpers";

interface UseTodoStoreProps {
  initialTodos?: Todo[];
}

export const useTodoStore = ({ initialTodos }: UseTodoStoreProps = {}) => {
  const [allTodoIds, setAllTodoIds] = useState<Todo["id"][]>(() => getInitialTodoIds(initialTodos));
  const [todoMap, setTodoMap] = useState<TodosMap>(() => getInitialTodoMap(initialTodos));
  const [todoStatusMap, setTodoStatusMap] = useState<TodoStatusMap>(() =>
    getInitialTodoStatusMap(initialTodos)
  );

  const addTodo = (text: string) => {
    const id = uuidv4();
    const newTodo = { id, text, status: "active" } as Todo;

    setAllTodoIds((prev) => [id, ...prev]);

    setTodoStatusMap((prev) => ({
      ...prev,
      all: [id, ...prev.all],
      active: [id, ...prev.active],
    }));

    setTodoMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, newTodo);
      return newMap;
    });
  };

  const updateTodoById = (todoId: Todo["id"], todoData: Partial<Omit<Todo, "id">>) => {
    const currentTodo = todoMap.get(todoId);

    if (!currentTodo) return;

    const newStatus = todoData.status;
    const currentStatus = currentTodo.status;

    setTodoMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(todoId, { ...currentTodo, ...todoData });
      return newMap;
    });

    if (newStatus && newStatus !== currentStatus) {
      setTodoStatusMap((statusPrev) => ({
        ...statusPrev,
        [currentStatus]: statusPrev[currentStatus].filter((id) => id !== todoId),
        [newStatus]: [todoId, ...statusPrev[newStatus]],
      }));
    }
  };

  const deleteTodoById = (todoId: Todo["id"]) => {
    const currentTodo = todoMap.get(todoId);

    if (!currentTodo) return;

    setTodoStatusMap((prev) => ({
      ...prev,
      all: prev.all.filter((itemId) => itemId !== todoId),
      [currentTodo.status]: prev[currentTodo.status].filter((itemId) => itemId !== todoId),
    }));

    setAllTodoIds((prev) => prev.filter((item) => item !== todoId));

    setTodoMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(todoId);
      return newMap;
    });
  };

  const deleteTodos = (ids: Todo["id"][]) => {
    if (!ids.length) return;

    setAllTodoIds((prev) => prev.filter((id) => !ids.includes(id)));

    setTodoMap((prev) => {
      const newMap = new Map(prev);
      ids.forEach((id) => newMap.delete(id));
      return newMap;
    });

    setTodoStatusMap((prev) => {
      const newStatusMap = { ...prev };
      (Object.keys(newStatusMap) as ShowTodoStatus[]).forEach((status) => {
        newStatusMap[status] = newStatusMap[status].filter((id) => !ids.includes(id));
      });
      return newStatusMap;
    });
  };

  return {
    allTodoIds,
    todoMap,
    todoStatusMap,
    addTodo,
    updateTodoById,
    deleteTodoById,
    deleteTodos,
  };
};
