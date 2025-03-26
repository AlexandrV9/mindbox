import cx from "clsx";

import { ShowTodoStatus } from "~/types";

import styles from "./TodoStatusFilter.module.css";

interface TodoStatusFilterProps {
  status: ShowTodoStatus;
  onChangeStatus?: (status: ShowTodoStatus) => void;
}

const statusList: ShowTodoStatus[] = ["all", "active", "completed"];

export const TodoStatusFilter = ({
  status: selectedStatus,
  onChangeStatus,
}: TodoStatusFilterProps) => {
  return (
    <ul className={styles.list}>
      {statusList.map((status) => (
        <li
          key={status}
          onClick={() => onChangeStatus?.(status)}
          className={cx(styles.item, { [styles.selected]: selectedStatus === status })}
        >
          {status}
        </li>
      ))}
    </ul>
  );
};
