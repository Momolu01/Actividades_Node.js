const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/todolist-routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(taskRoutes);

module.exports = app;
