export type TodoStatus = "active" | "completed";
export interface Todo {
  id: string;
  text: string;
  status: TodoStatus;
}
export type TodosMap = Map<Todo["id"], Todo>;
export type ShowTodoStatus = "all" | TodoStatus;
export type TodoStatusMap = Record<ShowTodoStatus, Todo["id"][]>;
