import { ChangeEvent } from "react";
import cx from "clsx";

import { CheckIcon } from "~/icons";

import styles from "./Checkbox.module.css";

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({ checked = false, disabled = false, onChange }: CheckboxProps) => {
  return (
    <label
      className={cx(styles.label, {
        [styles.disabled]: disabled,
      })}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={styles.input}
      />
      <span
        className={cx(styles.circle, {
          [styles.checked]: checked,
        })}
      >
        {checked && <CheckIcon width={15} height={15} color="#6200ee" />}
      </span>
    </label>
  );
};
