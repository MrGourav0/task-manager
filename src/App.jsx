import { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask = {
      id: Date.now(),
      title: trimmed,
      status: "pending", // NEW
    };

    setTasks((prev) => [...prev, newTask]);
    setTitle("");
  };

  const handleToggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "pending" ? "done" : "pending",
            }
          : task
      )
    );
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
                <span
                  style={{
                    textDecoration:
                      task.status === "done" ? "line-through" : "none",
                    color: task.status === "done" ? "#9ca3af" : "#111827",
                  }}
                >
                  {task.title}
                </span>
                <button
                  className="chip"
                  onClick={() => handleToggleStatus(task.id)}
                >
                  {task.status === "pending" ? "Mark Done" : "Mark Pending"}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
