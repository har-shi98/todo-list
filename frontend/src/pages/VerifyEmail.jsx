import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";


const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/api/users/verify", { email, otp });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-700">Verify Email</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          required
        />
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <button className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 font-semibold">
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;