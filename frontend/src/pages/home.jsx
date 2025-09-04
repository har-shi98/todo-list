import React from "react";
import useTodos from "../context/useTodos.js"
import { Link } from "react-router-dom";



function Home() {
  const { todos } = useTodos();
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-pink-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">📊 Dashboard</h1>
        <p className="text-lg text-gray-600">Welcome to your Task Manager!</p>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-100 rounded-xl">
            <h2 className="text-2xl font-bold text-blue-600">{total}</h2>
            <p className="text-gray-700">Total</p>
          </div>
          <div className="p-4 bg-green-100 rounded-xl">
            <h2 className="text-2xl font-bold text-green-600">{completed}</h2>
            <p className="text-gray-700">Completed</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-xl">
            <h2 className="text-2xl font-bold text-yellow-600">{pending}</h2>
            <p className="text-gray-700">Pending</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <Link
            to="/completetask"
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold"
          >
            View Completed Tasks
          </Link>
          <Link
            to="/pendingtask"
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-semibold"
          >
            View Pending Tasks
          </Link>
          <Link
            to="/todos"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
          >
            Go to All Tasks
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;