import React, { useState, useEffect } from "react";
import Todo from "../../components/Todo";
import NewTodoForm from "../../components/TodoForm";
import {fechTasks, completeTask, updateTask, deleteTask} from "../../services/tasks";
import "./style.css";

function TodoList() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTasks(){
      const tasks = await fechTasks();
      setTodos(tasks);
    }

    getTasks();

  }, []); 

  const create = newTodo => {
    setTodos([...todos, newTodo]); //Se está agregando la tarea en el estado
  };

  const remove =  id => {
    const newTodos = todos.filter(todo => todo.id !== parseInt(id))
    setTodos(newTodos);
    deleteTask(id);
  };

  const update =  (id, updatedTask) => {
    const updatedTodos = todos.map( todo => {
      if (todo.id === id) {
        updateTask(id, updatedTask);
        return { ...todo, ...updatedTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const toggleComplete = id => {
    const updatedTodos = todos.map( (todo) => {
      // console.log(todo);
      if (todo.id === id) {
        const output = { ...todo, completed: !todo.completed };
        completeTask(id, output); //Para completar (marcar) la tarea en el back
        return output;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const todosList = todos.map(todo => (
    <Todo
      toggleComplete={toggleComplete}
      update={update}
      remove={remove}
      key={todo.id}
      todo={todo}
    />
  ));

  return (
    <div className="TodoList">
      <h1>
        Taskit <span>Lista de tareas</span>
      </h1>
      <ul>{todosList}</ul>
      <NewTodoForm createTodo={create} />
    </div>
  );
}
export default TodoList;
