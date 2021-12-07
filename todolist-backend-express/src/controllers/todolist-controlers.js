const {
  getTasks,
  getTasksByid,
  addTask,
  updateTask,
  deleteTask,
  completeTask,
} = require('../services/todolist-service');

// Controlador para obtener toda la lista de tareas
const getTasksCtrl = async (req, res, next) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Controlador para obtener una tarea por su id
const getTasksByidCtrl = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const task = await getTasksByid(id);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const addTaskCtrl = async (req, res, next) => {
  const taskObj = req.body;
  try {
    res.json(await addTask(taskObj));
  } catch (error) {
    next(error);
  }
};

const updateTaskCtrl = (req, res, next) => {
  const data = req.body;
  const id = parseInt(req.params.id, 10);
  try {
    if (data.type === 'completed') {
      completeTask(id);
    } else if (data.type === 'update') {
      updateTask(id, data.task);
    }
    res.json({
      task: data.task,
      message: 'Se ha actualizado la tarea en el sistema',
    });
  } catch (error) {
    next(error);
  }
};

const deleteTaskCtrl = (req, res, next) => {
  const id = parseInt(req.params, 10);
  try {
    deleteTask(id);
    res.json({ message: 'Se ha eliminado la tarea en el sistema' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasksCtrl,
  getTasksByidCtrl,
  addTaskCtrl,
  updateTaskCtrl,
  deleteTaskCtrl,
};
