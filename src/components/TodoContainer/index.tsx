import { useState } from "react";

import { ShowTodoStatus } from "~/types";
import { useTodoStore } from "~/stores";

import { mockData } from "./mocks";
import { TodoInput } from "../TodoInput";
import { TodoList } from "../TodoList";
import { TodoStatusFilter } from "../TodoStatusFilter";

import styles from "./TodoContainer.module.css";

export const TodoContainer = () => {
  const { todoMap, todoStatusMap, addTodo, updateTodoById, deleteTodos } = useTodoStore({
    initialTodos: mockData,
  });

  const [showTodoStatus, setTypeShowTodos] = useState<ShowTodoStatus>("all");

  const changeStatusShowTodos = (status: ShowTodoStatus) => {
    setTypeShowTodos(status);
  };

  const handleAddTodo = (text: string) => {
    addTodo(text);
  };

  const handleDeleteCompletedTodos = () => {
    deleteTodos(todoStatusMap.completed);
  };

  const countCompleted = todoStatusMap.active.length;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>todos</h1>

      <TodoInput onAddTodo={handleAddTodo} />

      <div className={styles.wrapper}>
        <span className={styles.count}>
          {countCompleted > 99 ? "99+" : countCompleted} items left
        </span>
        <TodoStatusFilter status={showTodoStatus} onChangeStatus={changeStatusShowTodos} />
        <button className={styles["button-clear"]} onClick={handleDeleteCompletedTodos}>
          clear completed
        </button>
      </div>

      <TodoList
        todoIds={todoStatusMap[showTodoStatus]}
        todoMap={todoMap}
        onUpdateTodo={updateTodoById}
      />
    </div>
  );
};
