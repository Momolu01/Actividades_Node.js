const http = require('http');
const { getTasks, getTaskById, addTask, completeTask, updateTask, deleteTask, createTaskObj } = require('./todolist-services');
const url = require('url');
const { Console } = require('console');
const PORT = 8000;

http.createServer(async (request, response) => {

  response.setHeader('Access-Control-Allow-Origin', '*'); //Permitir las solicitudes desde cualquier origen
  response.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  response.setHeader('Allow', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');

  if (request.method === "OPTIONS") {
    response.statusCode = 204;
    response.end();
    return;
  }

  console.log(request.method);
  if (request.method === "GET") {
    //Método GET
    switch (request.url) {
      case '/':
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({
          message: "todolist server"
        }));
        break;
      case '/tasks':
        //Regresar la lista de tareas que se encuentra en el archivo todolist.json
        const tasks = await getTasks();
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(tasks));
        break;
      default:

        const urlObj = url.parse(request.url, true).pathname.split('/');
        const id = parseInt(urlObj[urlObj.length - 1]);
        const resource = urlObj[urlObj.length - 2];

        if (resource === "tasks") {
          const task = await getTaskById(id);
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(task));
        }

        break;
    }
  } else if (request.method === "POST") {
    //Método POST
    switch (request.url) {
      case '/tasks':
        //Obtenemos los datos que me está enviando el cliente
        let body = "";
        //Evento data -> se dispara cuando un cliente está enviando datos hacía el servidor
        request.on("data", (data) => {
          body += data.toString();
        });

        request.on("end", async () => { //Finalizo la entrega / envio de datos por parte del cliente 
          let taskObj = JSON.parse(body);
          await addTask(taskObj);
          const outPut = {
            task: taskObj,
            message: "Se ha agregado la tarea en el sistema"
          }
          response.writeHead(202, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(outPut));
        });

        break;
      default:
        break;
    }
  } else if (request.method === "PUT") {
    let body = "";
    switch (request.url) {
      default:
        const urlObj = url.parse(request.url, true).pathname.split('/');
        const id = parseInt(urlObj[urlObj.length - 1]);
        const resource = urlObj[urlObj.length - 2];
        if (resource === "tasks") {
          request.on("data", (data) => {
            const taskObj = JSON.parse(data.toString());
            switch (taskObj.type) {
              case 'completed':
                completeTask(id);
                break;
              case 'update':
                updateTask(id, taskObj.task);
                break;
              default:
                console.log('error');
                break;
            }
            const outPut = {
              task: taskObj.task,
              message: "Se ha actualizado la tarea en el sistema"
            }
            response.writeHead(202, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(outPut));
          });
          request.on("end", () => { //Finalizo la entrega / envio de datos por parte del cliente 
          });
        }
        break;
    }
  } else if (request.method === "DELETE") {
    switch (request.url) {
      case '/tasks':
        //Obtenemos los datos que me está enviando el cliente
        request.on("end", async () => { //Finalizo la entrega / envio de datos por parte del cliente 
          response.writeHead(202, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({
            message: "Se ha eliminado la tarea en el sistema"
          }));
        });

        break;
      default:
        const urlObj = url.parse(request.url, true).pathname.split('/');
        const id = parseInt(urlObj[urlObj.length - 1]);
        const resource = urlObj[urlObj.length - 2];
        if (resource === "tasks") {
          request.on("data", async (data) => {
            const newData = data.toString();
            deleteTask(id);
          });
          request.on("end", async () => { //Finalizo la entrega / envio de datos por parte del cliente 
            response.writeHead(202, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({
              message: "Se ha eliminado la tarea en el sistema"
            }))
          });
        }
        break;
    }
  }
}).listen(PORT);