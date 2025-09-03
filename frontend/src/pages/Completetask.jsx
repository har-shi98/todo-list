import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";


const Completetask = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    axios
      .get("/api/todos/completed")
      .then((res) => {
        setCompletedTasks(res.data);
      })
      .catch(() => setCompletedTasks([]));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          Completed Tasks
        </h2>
        {completedTasks.length === 0 ? (
          <p className="text-gray-400 text-center">No Completed Tasks</p>
        ) : (
          <ul className="space-y-3">
            {completedTasks.map((task) => (
              <li
                key={task._id}
                className="p-3 bg-green-100 rounded-lg flex items-center"
              >
                <span className="text-green-700 font-medium line-through flex-1">
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Completetask;