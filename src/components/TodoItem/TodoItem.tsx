import clsx from "clsx";
import { motion, useIsPresent } from "framer-motion";

import { TodoItemType } from "../../types";
import Checkbox from "../Checkbox/Checkbox";

import styles from "./styles.module.css";
const TodoItem = ({
  item,
  updateTodo,
  deleteTodo,
}: {
  item: TodoItemType;
  updateTodo: () => void;
  deleteTodo: () => void;
}) => {
  const isPresent = useIsPresent();
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 900, damping: 40 },
  };
  return (
    <motion.li
      {...animations}
      layout
      className={styles.li}
      style={{ position: isPresent ? "static" : "absolute" }}
    >
      <Checkbox
        id={item.id}
        onChange={updateTodo}
        defaultChecked={item.completed}
      />
      <label
        htmlFor={item.id}
        className={clsx(styles.label, item.completed && styles.line_through)}
      >
        {item.task}
      </label>
      <button className={styles.deleteButton} onClick={deleteTodo} />
    </motion.li>
  );
};

export default TodoItem;
