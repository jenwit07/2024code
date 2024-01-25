import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import fs from "fs";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";
import dayjs from "dayjs";
import path from "path";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const bodyParser = require("body-parser");
const port = 3000;

var app = express();
let todos = [];

app.use(json({ limit: "50mb", extended: true }));
app.use(urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Expose-Headers", "ETag");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(helmet());

/* Limit requests from same API */
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after an hour'
});
app.use(limiter);

/ * Swagger Documentation and OpenAPI Specification * /
const apiSpec = path.join( __dirname ,'api.yaml' );
const file  = fs.readFileSync(apiSpec, 'utf8')
const swaggerDocument = YAML.parse(file)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send(
    `Service is running`
  );
});

app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

app.post('/todos', (req, res) => {
  const { id, task } = req.body;
  if (!task) {
    return res.status(400).send('Task is required');
  }
  const newTodo = { id, task, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).send('Todo not found');
  }
  todo.task = task ?? todo.task;
  todo.completed = completed ?? todo.completed;
  res.status(200).json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(t => t.id !== id);
  res.status(204).send();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(port, () => {
  console.log(
    `#### Stat Time ${dayjs().format(
      "DD/MM/YYYY HH:mm:ss"
    )} --- Service is running on port ${port}`
  );
});

module.exports = app;
