const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const fs = require("fs/promises");
const path = require("path");

const { getTasks, addTask, completeTask, updateTask, deleteTask } = require('./todolist-service.js');
//Crear una instancia de express
const app = express();

const PORT = 8000;

//Middlewares -> Una función que hace de intermediario entre la petición y respuesta hacía el cliente
// | request | response |


//Middleware incorporado (built-in)
app.use(express.urlencoded({ extended: true })); //Atiende cualquier tipo de petición -> GET, POST, PUT, DELETE
app.use(express.json());
app.use(express.static("public")); //Indica que el servidor -> servirá archivos estaticos de este directorio

//Middleware de terceros (third party)
const corsOptions = {
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  'predlightContinue': false,
  'optionsSuccessStatus': 204,
  'headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
  'allow': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',

}
app.use(cors())
app.use(morgan("dev"));

// express.urlencoded({extended: true}) -> decodifica los datos que son enviados a través de x-www-urlencoded
// y los coloca en request.body

// express.json() -> nos ayuda a obtener los datos que son enviados en formato JSON

//Middleware de aplicación (application)
app.get('/', (request, response) => {
  response.json({ message: "todolist server" });
}); //Atiende peticiones a través del método get

app.get('/tasks', async (request, response) => {
  try {
    response.json(await getTasks());
  } catch (error) {
    console.log(error);
  }
});

app.get('/tasks/:id', async (request, response) => {
  try {
    const tasks = await getTasks();
    const id = request.params.id;
    const output = tasks.filter(e => e.id === parseInt(id))[0];
    if (output !== undefined) {
      response.json(output).status(200);
    } else {
      response.status(404).end('Notfound');
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/tasks', async (request, response) => {
  const tasks = await getTasks();
  const taskObj = request.body;
  addTask(taskObj);
  // response.status(201);
  response.json({ task: taskObj, message: 'Se ha agregado la tarea en el sistema' }).status(200);
});


app.put('/tasks/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const body = request.body;
  switch (body.type) {
    case 'completed':
      completeTask(id, body.task);
      break;
    case 'update':
      updateTask(id, body.task);
      break;
    default:
      console.log('Error');
      break;
  }
  response.json({ task: body.task, message: "Se ha actualizado la tarea en el sistema" }).status(204);
});

app.delete('/tasks/:id', (request, response) => {
  const id = parseInt(request.params.id);
  deleteTask(id);
  response.json({ message: "Se ha eliminado la tarea en el sistema" }).status(204);
});

//Configuramos app para escuchar sobre un puerto
app.listen(PORT, () => {
  console.log(`Servidor escuchando sobre el puerto ${PORT}`);
});

// http.createServer().listen();