import { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    const trimmed = title.trim();
    if (!trimmed) return; // empty mat add kar

    const newTask = {
      id: Date.now(),
      title: trimmed,
    };

    setTasks((prev) => [...prev, newTask]);
    setTitle("");
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">My Tasks</h1>

        <div className="task-input-row">
          <input
            type="text"
            className="task-input"
            placeholder="Type your task here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTask();
            }}
          />
          <button className="primary-btn" onClick={handleAddTask}>
            Add Task
          </button>
        </div>

        {/* Filters abhi sirf UI, logic nahi */}
        <div className="filters-row">
          <button className="chip active">All</button>
          <button className="chip">Done</button>
          <button className="chip">Pending</button>
        </div>

        <ul className="task-list">
          {tasks.length === 0 ? (
            <li className="task-item empty-text">
              No tasks yet. Add your first task!
            </li>
          ) : (
            tasks.map((task) => (
              <li key={task.id} className="task-item">
                <span>{task.title}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
