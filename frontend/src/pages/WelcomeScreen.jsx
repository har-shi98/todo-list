import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";


const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <h1
        className={`text-4xl font-bold text-blue-700 text-center transition-opacity duration-1000 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        Welcome to To-Do List
      </h1>
    </div>
  );
};

export default WelcomeScreen;