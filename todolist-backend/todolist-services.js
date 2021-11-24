const fs = require('fs/promises');
const path = require('path');

const TODOLIST_PATH = path.resolve("todolist.json");

const getTasks = async () => {
  //Obtener todas las tareas
  try {
    const tasks = await fs.readFile(TODOLIST_PATH, "utf8");
    return JSON.parse(tasks);
  } catch (error) {
    console.log(error);
  }
}

const getTaskById = async (id) => {
  try {
    id = parseInt(id);
    const tasks = await getTasks();
    return tasks.find(task => task.id === id);
  } catch (error) {
    console.log(error);
  }
}

const addTask = async (taskObj) => {
  //Agregar una tarea
  try {
    const tasks = await getTasks(); //Obtenemos todas las tareas

    //Generar el siguiente id de la lista
    const nextId = tasks.length + 1;

    //Creamos la propiedad id dentro de taskObj y le asignamos nextId
    //Usamos spread operator para copiar todas las propiedades y valores de taskObj
    taskObj = {
      id: nextId,
      ...taskObj
    };

    tasks.push(taskObj); //Agregamos la tarea a la lista
    await fs.writeFile(TODOLIST_PATH, JSON.stringify(tasks));
    return taskObj; //Regresamos el objeto tarea que agregamos
  } catch (error) {
    console.log(error);
  }
}

const updateTask = async (id, taskObj) => {
  //Actualizar una tarea
  try {
    const tasks = await getTasks(); // Lista de el array con todos los elementos
    const outPut = tasks.map(e => { // Localizar el elemento que se debe modificar
      if (e.id === id) {
        e = taskObj;
      }
      return e;
    });
    await fs.writeFile(TODOLIST_PATH, JSON.stringify(outPut))
  } catch (error) {
    console.log(error);
  }
}

const deleteTask = async (id) => {
  //Borrar una tarea
  try {
    const tasks = await getTasks(); // Lista de el array con todos los elementos
    const outPut = tasks.filter(e => e.id !== id);
    await fs.writeFile(TODOLIST_PATH, JSON.stringify(outPut));
  } catch (error) {
    console.log(error);
  }
}

const completeTask = async (id) => { 
  //Completar una tarea
  try {
    const tasks = await getTasks(); // Lista de el array con todos los elementos
    const outPut = tasks.map(e => { // Localizar el elemento que se debe modificar
      if (e.id === id) {
        e = {...e, completed: !e.completed};
      }
      return e;
    });
    await fs.writeFile(TODOLIST_PATH, JSON.stringify(outPut))
  } catch (error) {
    console.log(error);
  }
}

const createTaskObj = (uriEncoded) => {
  let bodyArr = decodeURIComponent(uriEncoded).split("&"); //Creamos un arreglo donde cada elemento sea [llave=valor]
  let dataObj = {}; //Objeto donde guardaremos la [llave=valor]
  bodyArr.map((e) => {
    const keyvalue = e.split('='); //Obtenemos un arreglo donde cada elemento va a ser [llave, valor]
    dataObj[keyvalue[0]] = keyvalue[1]; //la llave está en la posición 0 y el valor en la posición 1 del arreglo
  });
  return dataObj;
}

//CRUD

//C -> Create
//R -> Read
//U -> Update
//D -> Delete

module.exports = {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
  createTaskObj,
  completeTask
}