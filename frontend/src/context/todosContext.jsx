// frontend/src/context/TodosContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all todos (sirf logged-in user ke)
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

  // ✅ Add new todo
  const addTodo = async (text) => {
    try {
      const res = await axiosInstance.post("/todos", { text });
      setTodos((prev) => [...prev, res.data]); // naye todo ko list me add karo
    } catch (err) {
      console.error("❌ Failed to add todo:", err.response?.data || err.message);
    }
  };

  // ✅ Update todo (completed ya text change)
  const updateTodo = async (id, updates) => {
    try {
      const res = await axiosInstance.patch(`/todos/${id}`, updates);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? res.data : todo))
      );
    } catch (err) {
      console.error("❌ Failed to update todo:", err.response?.data || err.message);
    }
  };

  // ✅ Delete todo
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
      value={{
        todos,
        loading,
        fetchTodos,
        addTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
