const inquirer = require("inquirer");
const cTable = require("console.table");
const inputCheck = require("../utils/inputCheck");
const db = require("../db/db.sql");

const options = () => {
  return inquirer
    .prompt([
      {
        name: "option",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.option) {
        case "View all departments":
          db.viewAllDept();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartments();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee":
          UpdateEmployee();
          break;
      }
    });
};

const viewAllDept = () => {
    return this.connection.promise.query(
        "SELECT department.id department.name"
    )
};

const viewAllRoles = () => {
    return this.connection
    .promise()
    .query(
        "SELECT role.title, role.id, role.salary, role.department_id"
    )
};

const viewAllEmployees = () => {
  return this.connection
    .promise()
    .query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ',     manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
};

const addDepartments = () => {
    return this.connection
    .promise()
    .query(
        "INSERT INTO department(id, name) VALUES(?,?)"
    )
};

const addRole = () => {
    return this.connection
    .promise()
    .query(
        "INSERT INTO role(id, title, salary, department_id) VALUES(?,?,?,?)"
    )
};

const addEmployee = () => {
    return this.connection
    .promise()
    .query(
    "INSERT INTO employee(id, first_name, last_name, role_id, manager_id)"
    )
};

const UpdateEmployee = () => {
    return this.connection
    .promise()
    .query(
        "UPDATE employee.id SET role_id = '?' WHERE ID = '?'"
    )
};
options()