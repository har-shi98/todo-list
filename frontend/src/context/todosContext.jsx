// todosContext.jsx

import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

// 1) Create the context first (top of file)
const TodosContext = createContext();

// 2) Export the context (after it exists)
export default TodosContext;

// 3) Provider implementation
export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const res = await axiosInstance.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch todos:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text) => {
    try {
      const res = await axiosInstance.post("/todos", { text });
      setTodos((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("❌ Failed to add todo:", err.response?.data || err.message);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const res = await axiosInstance.patch(`/todos/${id}`, updates);
      setTodos((prev) => prev.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error("❌ Failed to update todo:", err.response?.data || err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axiosInstance.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete todo:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodosContext.Provider
      value={{ todos, loading, fetchTodos, addTodo, updateTodo, deleteTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
};
