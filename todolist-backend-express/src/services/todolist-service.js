/* eslint-disable no-useless-catch */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
const fs = require('fs').promises;
const path = require('path');

const TODOLIST_PATH = path.resolve('todolist.json');

const getTasks = async () => {
  try {
    const tasks = await fs.readFile(TODOLIST_PATH, 'utf8');
    return JSON.parse(tasks);
  } catch (error) {
    throw error;
  }
};

const getTasksByid = async (id) => {
  const tasks = await getTasks();
  try {
    const task = tasks.find((e) => e.id === id);
    return task;
  } catch (error) {
    throw error;
  }
};

const addTask = async (taskObj) => {
  try {
    const tasks = await getTasks();
    const nextId = tasks.length + 1;

    taskObj = {
      id: nextId,
      ...taskObj,
    };
    tasks.push(taskObj);

    await fs.writeFile(TODOLIST_PATH, JSON.stringify(tasks));

    return taskObj;
  } catch (error) {
    throw error;
  }
};

const completeTask = async (id) => {
  try {
    const tasks = await getTasks();
    const outPut = tasks.map((e) => {
      if (e.id === id) {
        e = { ...e, completed: !e.completed };
      }
      return e;
    });

    await fs.writeFile(TODOLIST_PATH, JSON.stringify(outPut));
  } catch (error) {
    throw error;
  }
};

const updateTask = async (id, taskObj) => {
  try {
    const tasks = await getTasks();
    const outPut = tasks.map((e) => {
      if (e.id === id) {
        e = taskObj;
      }
      return e;
    });
    await fs.writeFile(TODOLIST_PATH, JSON.stringify(outPut));
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (id) => {
  try {
    const tasks = await getTasks();
    const outPut = tasks.filter((e) => e.id !== id);
    fs.writeFile(TODOLIST_PATH, JSON.stringify(outPut));
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTasks,
  getTasksByid,
  addTask,
  updateTask,
  deleteTask,
  completeTask,
};
