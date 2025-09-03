import { useState } from "react";
import bgImg from "../assets/bg3.webp";
import { useTodos } from "../context/TodosContext.jsx";

function TodoItem({
  todo,
  isEditing,
  editedText,
  setEditedText,
  onToggle,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}) {
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200">
      <button
        onClick={() => onToggle(todo._id, todo.completed)}
        className={`flex-shrink-0 h-6 w-6 border rounded-full flex items-center justify-center ${
          todo.completed ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-blue-400"
        }`}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            role="img"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      {isEditing ? (
        <form onSubmit={(e) => onSaveEdit(e, todo._id)} className="flex-1 flex gap-2 items-center">
          <input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button type="submit" className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
          <button
            onClick={onCancelEdit}
            className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
            type="button"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span className={"flex-1 mx-3 truncate font-medium " + (todo.completed ? " line-through text-gray-400" : "") }>
            {todo.text}
          </span>
          <button
            onClick={() => onStartEdit(todo)}
            className="p-2 text-blue-500 hover:text-blue-700 rounded hover:bg-blue-100 transition"
            title="Edit Task"
          >
            ✏
          </button>
          <button
            onClick={() => onDelete(todo._id)}
            className="p-2 text-red-500 hover:text-red-700 rounded hover:bg-red-100 transition ml-2"
            title="Delete Task"
          >
            🗑
          </button>
        </>
      )}
    </div>
  );
}

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const { todos, loading, addTodo, updateTodo, deleteTodo } = useTodos();

  // Add new task
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await addTodo(newTodo.trim());
    setNewTodo("");
  };

  // Mark complete/incomplete
  const toggleTodo = async (id, completed) => {
    await updateTodo(id, { completed: !completed });
  };

  // Delete task
  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
  };

  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditedText(todo.text);
  };

  // Save edited task
  const saveEdit = async (e, id) => {
    e.preventDefault();
    if (!editedText.trim()) return;
    await updateTodo(id, { text: editedText.trim() });
    setEditingId(null);
    setEditedText("");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="bg-blue-300 border-2 border-indigo-400 hover:border-pink-500 transition-all duration-300 rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Task Manager</h1>
        <form onSubmit={handleAddTodo} className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 outline-none px-3 py-2 text-black placeholder-grey-400 border border-grey rounded-lg"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer"
          >
            Add Task
          </button>
        </form>
        <div>
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            todos.length === 0 ? (
              <div className="text-center text-gray-500">No tasks yet.</div>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  isEditing={editingId === todo._id}
                  editedText={editedText}
                  setEditedText={setEditedText}
                  onToggle={toggleTodo}
                  onStartEdit={startEditing}
                  onCancelEdit={() => setEditingId(null)}
                  onSaveEdit={saveEdit}
                  onDelete={handleDeleteTodo}
                />
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
