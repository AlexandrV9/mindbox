import { Todo, TodosMap } from "~/types";
import { TodoItem } from "./TodoItem";

import styles from "./TodoList.module.css";

interface TodoListProps {
  todoMap: TodosMap;
  todoIds: Todo["id"][];
  onUpdateTodo?: (todoId: Todo["id"], todoData: Partial<Omit<Todo, "id">>) => void;
}

export const TodoList = ({ todoMap, todoIds, onUpdateTodo }: TodoListProps) => {
  const handleCheck = (todo?: Todo) => {
    if(!todo) return;
    onUpdateTodo?.(todo.id, {
      status: todo.status === "active" ? "completed" : "active",
    });
  };

  return (
    <ul className={styles.list}>
      {todoIds.map((todoId) => (
        <TodoItem
          key={todoId}
          data={todoMap.get(todoId)}
          onCheck={() => handleCheck(todoMap.get(todoId))}
        />
      ))}
    </ul>
  );
};
