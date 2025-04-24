import React, { useState, useEffect } from "react";

const API_URL = "https://playground.4geeks.com/todo/todos/alesanchezr";

const Home = () => {
  const [nuevoTodo, setNuevoTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // Crear usuario y cargar tareas al iniciar
  useEffect(() => {
    crearUsuario();
    fetchTodos();
  }, []);

  const crearUsuario = () => {
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify([]), // Usuario nuevo con lista vacía
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => console.log("Usuario creado:", data))
    .catch(err => console.error("Error al crear usuario:", err));
  };

  const fetchTodos = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error al obtener tareas:", err));
  };

  const handleClick = () => {
    if (nuevoTodo.trim() === "") return;

    const nuevaTarea = {
      label: nuevoTodo,
      done: false
    };

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(nuevaTarea),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(() => {
      setNuevoTodo("");
      fetchTodos(); // Recarga lista
    })
    .catch(err => console.error("Error al agregar tarea:", err));
  };

  const deleteTodo = (indice) => {
    fetch(`${API_URL}/${indice}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => fetchTodos())
    .catch(err => console.error("Error al eliminar tarea:", err));
  };

  const clearTodos = () => {
    Promise.all(todos.map((_, i) =>
      fetch(`${API_URL}/${i}`, { method: "DELETE" })
    ))
    .then(() => fetchTodos())
    .catch(err => console.error("Error al limpiar tareas:", err));
  };

  const handleChange = (event) => {
    setNuevoTodo(event.target.value);
  };

  return (
    <div className="text-center">
      <h1 className="text-center mt-5">Lista de Tareas</h1>
      <div>
        <input type="text" value={nuevoTodo} onChange={handleChange} />
        <button onClick={handleClick}>Agregar tarea</button>
        <button onClick={clearTodos} className="btn btn-danger mx-2">🧹 Limpiar todas</button>
      </div>
      <p>Nueva tarea: {nuevoTodo}</p>
      <ul>
        {todos.map((todo, indice) => (
          <li key={indice}>
            {todo.label} <button onClick={() => deleteTodo(indice)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;