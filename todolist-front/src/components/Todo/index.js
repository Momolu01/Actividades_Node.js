import React, { useState } from "react";
import "./style.css";

function Todo({ todo, remove, update, toggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(todo);

  const handleClick = evt => {
    remove(evt.target.id);
  };
  const toggleFrom = () => {
    setIsEditing(!isEditing);
  };
  const handleUpdate = evt => {
    evt.preventDefault();
    console.log('asdf',task);
    update(todo.id, task);
    toggleFrom();
  };
  const handleChange = evt => {
    setTask({...task, [evt.target.name]: evt.target.value});
  };
  const toggleCompleted = evt => {
    toggleComplete(parseInt(evt.target.id));
  };

  let result;
  if (isEditing) {
    result = (
      <div className="Todo">
        <form className="Todo-edit-form" onSubmit={handleUpdate}>
          <input onChange={handleChange} value={task.title} type="text" name="title" />
          <textarea 
            id="description"
            name="description"
            placeholder="1 kg de arroz"
            value={task.description}
            rows="4"
            onChange={handleChange}
          ></textarea>
          <input 
            id="due_date"
            type="date"
            name="due_date"
            value={task.due_date}
            onChange={handleChange}
            />
          <div className="btn-container">
            <button type="submit">Actualizar</button>
            <button type="button" onClick={toggleFrom} className="btn-cancel">Cancelar</button>
          </div>
        </form>
      </div>
    );
  } else {
    result = (
      <div className="Todo">
        <li
          id={todo.id}
          onClick={toggleCompleted}
          className={todo.completed ? "Todo-task completed" : "Todo-task"}
        >
          {todo.title}
        </li>
        <div className="Todo-buttons">
          <button onClick={toggleFrom}>
            <i className="fas fa-pen" />
          </button>
          <button onClick={handleClick}>
            <i id={todo.id} className="fas fa-trash" />
          </button>
          <button onClick={toggleCompleted}>
            <i id={todo.id} className="fas fa-check" />
          </button>
        </div>
      </div>
    );
  }
  return result;
}

export default Todo;
