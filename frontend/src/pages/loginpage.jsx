import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";  

const LoginPage = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegister) {
      // 👉 Register
      try {
        await axios.post("/api/users/register", form);
        setIsRegister(false); // Registration ke baad login form dikhana
      } catch (err) {
        setError(err.response?.data?.error || "Registration failed");
      }
    } else {
      // 👉 Login
      try {
        const res = await axios.post("/api/users/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("name", res.data.name);
        navigate("/home");
      } catch (err) {
        setError(err.response?.data?.error || "Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          {isRegister ? "Register" : "Login"}
        </h2>

        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full mb-4 px-3 py-2 border rounded"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && (
          <div className="text-red-500 mb-4 text-center">{error}</div>
        )}

        <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold">
          {isRegister ? "Register" : "Login"}
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-blue-600 underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account? Login"
              : "New user? Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
