const { Router } = require('express');
const {
  getTasksCtrl,
  getTasksByidCtrl,
  addTaskCtrl,
  updateTaskCtrl,
  deleteTaskCtrl,
} = require('../controllers/todolist-controlers');

const router = Router();

router.get('/'); // Pagina inicial
router.get('/tasks', getTasksCtrl); // Devuelve todas las tareas
router.get('/tasks/:id', getTasksByidCtrl); // Devuelve una tarea por su id
router.post('/tasks', addTaskCtrl); // agrega una tarea nueva
router.put('/tasks/:id', updateTaskCtrl); // Actualiza una tarea por su id
router.delete('/tasks/:id', deleteTaskCtrl); // Elimina una tarea por su id

module.exports = router;
