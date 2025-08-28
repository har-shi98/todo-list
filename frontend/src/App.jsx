import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/todos");
        setTodos(res.data);
      } catch (err) {
        alert("Failed to fetch todos");
      }
      setLoading(false);
    };
    fetchTodos();
  }, []);


  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const res = await axios.post("/api/todos", { text: newTodo.trim() });
      setTodos([...todos, res.data]);
      setNewTodo("");
    } catch (err) {
      alert("Failed to add todo");
    }
  };

  
  const toggleTodo = async (id, completed) => {
    try {
      const res = await axios.patch(`/api/todos/${id}`, { completed: !completed });
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      alert("Failed to update todo");
    }
  };

  
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      alert("Failed to delete todo");
    }
  };

  
  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditedText(todo.text);
  };

  
  const saveEdit = async (e, id) => {
    e.preventDefault();
    if (!editedText.trim()) return;
    try {
      const res = await axios.patch(`/api/todos/${id}`, { text: editedText.trim() });
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
      setEditingId(null);
      setEditedText("");
    } catch (err) {
      alert("Failed to edit todo");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Task Manager
        </h1>

        <form onSubmit={addTodo} className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer"
          >
            Add Task
          </button>
        </form>

        <div className="mt-4 max-h-96 overflow-auto">
          {loading ? (
            <p className="text-gray-400 text-center">Loading...</p>
          ) : todos.length === 0 ? (
            <p className="text-gray-400 text-center">No tasks yet</p>
          ) : (
            todos.map((todo) => (
              <div key={todo._id} className="flex items-center justify-between p-3 border-b border-gray-200">
                <button
                  onClick={() => toggleTodo(todo._id, todo.completed)}
                  className={`flex-shrink-0 h-6 w-6 border rounded-full flex items-center justify-center ${
                    todo.completed ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {todo.completed && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                {editingId === todo._id ? (
                  <form onSubmit={(e) => saveEdit(e, todo._id)} className="flex flex-1 mx-3 gap-2">
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="flex-1 p-2 border rounded"
                    />
                    <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                      type="button"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <span className={`flex-1 mx-3 truncate font-medium ${todo.completed ? "line-through text-gray-400" : ""}`}>
                      {todo.text}
                    </span>

                    <button
                      onClick={() => startEditing(todo)}
                      className="p-2 text-blue-500 hover:text-blue-700 rounded hover:bg-blue-100 transition"
                      title="Edit Task"
                    >
                      ✏
                    </button>

                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="p-2 text-red-500 hover:text-red-700 rounded hover:bg-red-100 transition ml-2"
                      title="Delete Task"
                    >
                      🗑
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;