import { useEffect, useState } from "react";

function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on first render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (taskText.trim() === "") return;

    setTasks([
      ...tasks,
      { text: taskText, completed: false }
    ]);

    setTaskText("");
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function toggleComplete(index) {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }

  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="app">
      <h1 className="title">
        <img src="/list.png" alt="To-Do Icon" className="icon" />
        <span>To-Do List</span>
      </h1>
      <p className="counter">
        Pending Tasks: <strong>{pendingCount}</strong>
      </p>

      <div className="input-section">
        <input
          type="text"
          placeholder="What do you need to do?"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <div className="task-left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
              />
              <span>{task.text}</span>
            </div>

            <button
              className="delete-btn"
              onClick={() => deleteTask(index)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
