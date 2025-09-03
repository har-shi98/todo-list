import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { TodosProvider } from "./context/todosContext.jsx";
import WelcomeScreen from "./pages/WelcomeScreen.jsx";
import Home from "./pages/home.jsx";
import Completetask from "./pages/Completetask.jsx";
import Pendingtask from "./pages/pendingtask.jsx";
import Todos from "./pages/todos.jsx";
import LoginPage from "./pages/loginpage.jsx";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <TodosProvider>
      <Router>
        <Routes>
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/completetask" element={<Completetask />} />
          <Route path="/pendingtask" element={<Pendingtask />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </Router>
    </TodosProvider>
  );
}

export default App;
