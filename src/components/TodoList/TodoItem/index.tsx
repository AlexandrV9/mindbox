import cx from "clsx";

import { Todo } from "~/types";
import { Checkbox } from "../Checkbox";

import styles from "./TodoItem.module.css";

interface TodoItemProps {
  data?: Todo;
  onCheck?: () => void;
}

export const TodoItem = ({ data: todo, onCheck }: TodoItemProps) => {
  const isChecked = todo?.status === "completed";

  return (
    <li className={cx(styles.item, { [styles.checked]: isChecked })}>
      <Checkbox checked={isChecked} onChange={onCheck} />
      <span className={styles.text}>{todo?.text}</span>
    </li>
  );
};
