import React, { useReducer } from "react";
import { postTask } from "../../services/tasks";
import "./style.css";

function NewTodoForm({ task, createTodo }) {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: "",
      description: "",
      due_date: new Date()
    }
  );

  const handleChange = evt => {
    setUserInput({ [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async e => {

    const hoy = new Date();
    function formatoFecha(fecha, formato) {
      const map = {
        dd: fecha.getDate(),
        mm: fecha.getMonth() + 1,
        yyyy: fecha.getFullYear()
      }

      return formato.replace(/dd|mm|yyyy/gi, matched => map[matched]);
    }
    const actualDate = formatoFecha(hoy, 'yyyy/mm/dd');

    e.preventDefault();
    const newTodo = {
      title: userInput.title,
      description: userInput.description,
      started_date: actualDate,
      due_date: userInput.due_date,
      completed: false
    };
    await postTask(newTodo);
    createTodo(newTodo);
    setUserInput({ title: "" });
  };

  return (
    <form className="NewTodoForm" onSubmit={handleSubmit}>
      <label htmlFor="task">Nueva tarea</label>
      <input
        value={userInput.title}
        onChange={handleChange}
        id="title"
        type="text"
        name="title"
        placeholder="Titulo"
      />
      <textarea
        id="description"
        name="description"
        placeholder="1 kg de arroz"
        rows="4"
        onChange={handleChange}
      ></textarea>
      <input
        id="due_date"
        type="date"
        name="due_date"
        onChange={handleChange}
      />
      <button>Agregar tarea</button>
    </form>
  );
}

export default NewTodoForm;
