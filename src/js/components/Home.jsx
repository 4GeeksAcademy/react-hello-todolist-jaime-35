import React, { useState, useEffect } from "react";
import "../../styles/index.css"; // ✅ ruta corregida

const username = "jaimetodo";
const API_BASE = `https://playground.4geeks.com/todo`;

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [nuevoTodo, setNuevoTodo] = useState("");
  const [modoOscuro, setModoOscuro] = useState(() => {
    return localStorage.getItem("modoOscuro") === "true";
  });

  useEffect(() => {
    fetch(`${API_BASE}/users/${username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([]),
    })
      .then((res) => {
        if (!res.ok) console.warn("Usuario ya existe o hubo un error");
        return fetchTodos();
      })
      .catch((err) => console.error("Error al crear usuario:", err));
  }, []);

  useEffect(() => {
    localStorage.setItem("modoOscuro", modoOscuro);
  }, [modoOscuro]);

  const fetchTodos = () => {
    fetch(`${API_BASE}/users/${username}`)
      .then((res) => res.json())
      .then((data) => setTodos(data.todos || []))
      .catch((err) => console.error("Error cargando tareas:", err));
  };

  const agregarTarea = () => {
    if (!nuevoTodo.trim()) return;
    fetch(`${API_BASE}/todos/${username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: nuevoTodo.trim(), is_done: false }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al agregar tarea");
        setNuevoTodo("");
        fetchTodos();
      })
      .catch((err) => console.error(err));
  };

  const eliminarTarea = (todoId) => {
    fetch(`${API_BASE}/todos/${todoId}`, {
      method: "DELETE",
    })
      .then(() => fetchTodos())
      .catch((err) => console.error("Error al eliminar tarea:", err));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") agregarTarea();
  };

  return (
    <div className={modoOscuro ? "dark-mode" : ""}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button onClick={() => setModoOscuro(!modoOscuro)}>
          {modoOscuro ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
        </button>
      </div>

      <h1>📝 Lista de Tareas</h1>

      <input
        type="text"
        placeholder="Escribe una tarea y presiona Enter"
        value={nuevoTodo}
        onChange={(e) => setNuevoTodo(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <ul>
        {todos.length === 0 ? (
          <li>No hay tareas, añade una ✨</li>
        ) : (
          todos.map((tarea) => (
            <li key={tarea.id}>
              {tarea.label}
              <button
                className="delete-btn"
                onClick={() => eliminarTarea(tarea.id)}
              >
                🗑️
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Home;