import { useRef } from "react";
import styles from "./TodoInput.module.css";

interface TodoInputProps {
  onAddTodo?: (text: string) => void;
}

export const TodoInput = ({ onAddTodo }: TodoInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value.trim();

    if (e.key === "Enter" && text) {
      onAddTodo?.(text);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <input
      ref={inputRef}
      className={styles.input}
      placeholder="What need to be done?"
      onKeyDown={handleKeyDown}
    />
  );
};
