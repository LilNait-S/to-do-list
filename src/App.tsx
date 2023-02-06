import { useState } from "react";
import "./App.css";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <div className="font-sans dark:bg-slate-800 dark:text-white h-full">
      <ToDoList />
    </div>
  );
}

export default App;
