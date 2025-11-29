import { useState } from "react";
import "./App.css";

const FILTERS = {
  all: "ALL",
  done: "DONE",
  pending: "PENDING",
};

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(FILTERS.all);

  const handleAddTask = () => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask = {
      id: Date.now(),
      title: trimmed,
      status: "pending",
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

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getFilteredTasks = () => {
    if (filter === FILTERS.done) {
      return tasks.filter((t) => t.status === "done");
    }
    if (filter === FILTERS.pending) {
      return tasks.filter((t) => t.status === "pending");
    }
    return tasks; // all
  };

  const visibleTasks = getFilteredTasks();

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
          <button
            className={`chip ${
              filter === FILTERS.all ? "active" : ""
            }`}
            onClick={() => setFilter(FILTERS.all)}
          >
            All
          </button>
          <button
            className={`chip ${
              filter === FILTERS.done ? "active" : ""
            }`}
            onClick={() => setFilter(FILTERS.done)}
          >
            Done
          </button>
          <button
            className={`chip ${
              filter === FILTERS.pending ? "active" : ""
            }`}
            onClick={() => setFilter(FILTERS.pending)}
          >
            Pending
          </button>
        </div>

        <ul className="task-list">
          {visibleTasks.length === 0 ? (
            <li className="task-item empty-text">
              No tasks in this view.
            </li>
          ) : (
            visibleTasks.map((task) => (
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

                <div style={{ display: "flex", gap: "0.4rem" }}>
                  <button
                    className="chip"
                    onClick={() => handleToggleStatus(task.id)}
                  >
                    {task.status === "pending" ? "Mark Done" : "Mark Pending"}
                  </button>

                  <button
                    className="chip"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
