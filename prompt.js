const inquirer = require("inquirer");
const cTable = require("console.table");
const inputCheck = require("../Employee-tracker1/utils/inputCheck");
const db = require("../Employee-tracker1/db/connection");

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
          viewAllDept();
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
    }).catch((err) => console.error(err));
};

const viewAllDept = () => {
     db.promise().query(
        "SELECT * FROM department"
    )
    .then((data)=> console.table(data))
    .then(() => options())
    .catch((err) => console.log(err));
};

const viewAllRoles = () => {
    db.promise().query(
        "SELECT * FROM role"
    ).then((data) => console.table(data))
    .then(()=> options())
    .catch((err) => console.log(err));
};

const viewAllEmployees = () => {
  return this.connection.query(
      "SELECT * FROM employee"
    ).then((data) => console.log(data))
    .then(() => options());
};

const addDepartments = () => {
    return this.connection.query(
        "INSERT INTO department(id, name) VALUES(?,?)"
    ).then((data) => console.log(data))
    .then(() => options());
};

const addRole = () => {
    return this.connection
    .query(
        "INSERT INTO role(id, title, salary, department_id) VALUES(?,?,?,?)"
    ).then((data) => console.log(data))
    .then(() => options())
};

const addEmployee = () => {
    return this.connection
    .query(
    "INSERT INTO employee(id, first_name, last_name, role_id, manager_id)"
    ).then((data) => console.log(data))
    .then(() => options())
};

const UpdateEmployee = () => {
    return this.connection
    .promise()
    .query(
        "UPDATE employee.id SET role_id = '?' WHERE ID = '?'"
    ).then((data) => console.log(data))
    .then(() => options());
};
options()