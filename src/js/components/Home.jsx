import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
    const [nuevoTodo, setNuevoTodo] = useState("nueva tarea");
	const [todos, setTodos] = useState(["una tarea de prueba"]);
  
	const handleClick = () => {
	  if (nuevoTodo.trim() === "") return; 
	  //console.log("Nueva tarea:", nuevoTodo);
	  setTodos([...todos, nuevoTodo]);
	  setNuevoTodo(""); // Limpia el input después de agregar
	};
  
	const deleteTodo = (indice) => {
	  const ListaNueva = todos.filter((_, i) => i !== indice);
	  setTodos(ListaNueva);
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
		</div>
		<p>Nueva tarea: {nuevoTodo}</p>
		<ul>
		  {todos.map((todo, indice) => (
			<li key={indice}>
			  {todo} <button onClick={() => deleteTodo(indice)}>Borrar</button>
			</li>
		  ))}
		</ul>
	  </div>
	);
  };
  
  export default Home;
	