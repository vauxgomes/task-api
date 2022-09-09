const express = require("express");
const routes = express.Router();

// Middlewares
const auth = require("./middlewares/auth");

//
const AccountsController = require("./controllers/AccountsController");
const UsersController = require("./controllers/UsersController");
const TasksController = require("./controllers/TasksController");

// System
routes.get("/", (req, res) => {
  return res.send({
    system: "Exemplo de servidor",
    version: 1.0,
    request_date: new Date().toLocaleString(),
  });
});

// Accounts
routes.post("/login", AccountsController.register);

// Users
routes.get('/users/', auth, UsersController.index)
routes.get("/users/:id", auth, UsersController.show);
routes.post("/users", auth, UsersController.create);
routes.put("/users/:id", auth, UsersController.update);
routes.delete("/users/:id", auth, UsersController.delete);

// Tasks
routes.get("/tasks/", auth, TasksController.index);
routes.get("/tasks/:id", auth, TasksController.show);
routes.post("/tasks", auth, TasksController.create);
routes.put("/tasks/:id", auth, TasksController.update);
routes.delete("/tasks/:id", auth, TasksController.delete);

// Export
module.exports = routes;
