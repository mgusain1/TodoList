import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Add a new task
  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        completed: false,
        description: newTask.trim(),
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a single task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Clear all tasks
  const clearAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          placeholder="Add a new task here"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => toggleTaskCompletion(task.id)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "#888" : "#000",
            }}
          >
            <span>{task.description}</span>
            <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {tasks.length > 0 && (
        <button onClick={clearAllTasks} className="clear-btn">
          Clear All
        </button>
      )}
    </div>
  );
}

export default App;
