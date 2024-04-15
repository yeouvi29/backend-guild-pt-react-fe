import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

import reactLogo from "./assets/react.svg";
import nodeLogo from "./assets/node.svg";

import { TodoItemType } from "./types";
import TodoItem from "./components/TodoItem/TodoItem";
import TitleBox from "./components/TitleBox/TitleBox";

import styles from "./App.module.css";
import React from "react";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState("");
  const [message, setMessage] = useState("");

  const handleInput = () => {
    if (inputRef.current === null) return;
    setInputText(inputRef.current.value);
  };

  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!inputText) {
        setMessage("Please enter a task");
        return;
      }
      const newTodo: TodoItemType = {
        id: Date.now().toString(),
        task: inputText,
        completed: false,
      };
      const res = await fetch(`${API_URL}/api/addTodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: newTodo }),
      });
      if (res.status === 200) {
        setTodos([...todos, newTodo]);
        setInputText("");
      } else {
        setMessage("Failed to add todo");
      }
    } catch (error) {
      setMessage("Failed to add todo");
    }
  };

  const updateTodo = async (id: string, completed: boolean) => {
    try {
      const res = await fetch(`${API_URL}/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      });
      if (res.status === 200) {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
      } else {
        setMessage("Failed to update todo");
      }
    } catch (error) {
      setMessage("Failed to update todo");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/todos/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      } else {
        setMessage("Failed to delete todo");
      }
    } catch (error) {
      setMessage("Failed to delete todo");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 1000);
    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_URL}/api/todos`);
      const data = await response.json();
      setTodos(data);
    })();
  }, []);

  return (
    <Fragment>
      <header className={styles.header}>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className={clsx(styles.logo, styles.react)}
            alt="React logo"
          />
        </a>
        <a href="https://nodejs.org/" target="_blank">
          <img
            src={nodeLogo}
            className={clsx(styles.logo, styles.node)}
            alt="Node logo"
          />
        </a>
      </header>
      <main className={styles.main}>
        <TitleBox key={todos.length} />
        <form className={styles.form} onSubmit={addTodo}>
          <input
            className={styles.input}
            ref={inputRef}
            value={inputText}
            type="text"
            onChange={handleInput}
          />
          <button type="submit">add Todo</button>
        </form>

        <ul className={styles.ul}>
          <AnimatePresence>
            {todos &&
              todos.length &&
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  item={todo}
                  updateTodo={() => {
                    updateTodo(todo.id, todo.completed);
                  }}
                  deleteTodo={() => {
                    deleteTodo(todo.id);
                  }}
                />
              ))}
          </AnimatePresence>
        </ul>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, x: "-50%", y: "200%" }}
              animate={{ opacity: 1, x: "-50%", y: "0%" }}
              exit={{ opacity: 0, x: "-50%", y: "200%" }}
              transition={{ duration: 0.25 }}
              className={styles.errorMessage}
            >
              <p>{message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </Fragment>
  );
}

export default App;
