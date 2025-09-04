import React from "react";
import TodosContext from "./todosContext.jsx";

const useTodos = () => React.useContext(TodosContext);
export default useTodos;
