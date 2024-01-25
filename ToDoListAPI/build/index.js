"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _bodyParser = require("body-parser");
var _cors = _interopRequireDefault(require("cors"));
var _fs = _interopRequireDefault(require("fs"));
var _yaml = _interopRequireDefault(require("yaml"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var _path = _interopRequireDefault(require("path"));
var _helmet = _interopRequireDefault(require("helmet"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var bodyParser = require("body-parser");
var port = 3000;
var app = (0, _express["default"])();
var todos = [];
app.use((0, _bodyParser.json)({
  limit: "50mb",
  extended: true
}));
app.use((0, _bodyParser.urlencoded)({
  limit: "50mb",
  extended: true
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Expose-Headers", "ETag");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use((0, _cors["default"])());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use((0, _helmet["default"])());

/* Limit requests from same API */
var limiter = (0, _expressRateLimit["default"])({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after an hour'
});
app.use(limiter);
/ * Swagger Documentation and OpenAPI Specification * /;
var apiSpec = _path["default"].join(__dirname, 'api.yaml');
var file = _fs["default"].readFileSync(apiSpec, 'utf8');
var swaggerDocument = _yaml["default"].parse(file);
app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerDocument));
app.get("/", function (req, res) {
  res.send("Service is running");
});
app.get('/todos', function (req, res) {
  res.status(200).json(todos);
});
app.post('/todos', function (req, res) {
  var _req$body = req.body,
    id = _req$body.id,
    task = _req$body.task;
  if (!task) {
    return res.status(400).send('Task is required');
  }
  var newTodo = {
    id: id,
    task: task,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
app.put('/todos/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
    task = _req$body2.task,
    completed = _req$body2.completed;
  var todo = todos.find(function (t) {
    return t.id === id;
  });
  if (!todo) {
    return res.status(404).send('Todo not found');
  }
  todo.task = task !== null && task !== void 0 ? task : todo.task;
  todo.completed = completed !== null && completed !== void 0 ? completed : todo.completed;
  res.status(200).json(todo);
});
app["delete"]('/todos/:id', function (req, res) {
  var id = req.params.id;
  todos = todos.filter(function (t) {
    return t.id !== id;
  });
  res.status(204).send();
});
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors
  });
});
app.listen(port, function () {
  console.log("#### Stat Time ".concat((0, _dayjs["default"])().format("DD/MM/YYYY HH:mm:ss"), " --- Service is running on port ").concat(port));
});
module.exports = app;
//# sourceMappingURL=index.js.map