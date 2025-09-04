import React from "react";
import useTodos from "../context/useTodos.js";



const Pendingtask = () => {
  const { todos, updateTodo } = useTodos();
  const pendingTasks = todos.filter(task => !task.completed);

  const markComplete = async (id) => {
    await updateTodo(id, { completed: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-yellow-700 text-center">Pending Tasks</h2>
        {pendingTasks.length === 0 ? (
          <p className="text-gray-400 text-center">No Pending Tasks</p>
        ) : (
          <ul className="space-y-3">
            {pendingTasks.map((task) => (
              <li key={task._id} className="p-3 bg-yellow-100 rounded-lg flex items-center">
                <span className="text-yellow-700 font-medium flex-1">{task.text}</span>
                <button
                  className="ml-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => markComplete(task._id)}
                >
                  Mark Complete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Pendingtask;