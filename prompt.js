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
  db.promise().query(
      "SELECT * FROM employee"
    ).then((data) => console.table(data))
    .then(() => options())
    .catch((err) => console.log(err));
};

const addDepartments = (name) => {
    db.promise().query(
        "INSERT INTO department(name) VALUES(?)", [name]
    ).then((data) => console.table(data))
    .then(() => options())
    .catch((err) => console.log(err));
};

const addRole = () => {
    db.promise()
    .query(
        "INSERT INTO role(id, title, salary, department_id) VALUES(?,?,?,?)"
    ).then((data) => console.log(data))
    .then(() => options())
};

function addEmployee() {
  db
  .promise()
  .query(`SELECT id, title FROM role`)
  .then(([rows, fields]) => JSON.parse(JSON.stringify(rows)))
  .then((roles) => {
    const titles = roles.map((role) => role.title);
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?",
          // validate: (input) => {
          //   const regexp = new RegExp(/^[0-9 a-z,.'-@]+$/, "i");
          //   return regexp.test(input) && input.length > 0
          //     ? true
          //     : "Input not valid!";
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?",
          // validate: (input) => {
          //   const regexp = new RegExp(/^[0-9 a-z,.'-@]+$/, "i");
          //   return regexp.test(input) && input.length > 0
          //     ? true
          //     : "Input not valid!";
          // },
        },
        {
          type: "list",
          name: "role",
          message: "What is the employee's role?",
          choices: titles,
        },
      ])
      .then((answers) => {
        db.query(
          `SELECT id FROM role WHERE title = "${answers.role}"`,
          (err, id) => {
            if (err) throw err;
            db.query(
              `INSERT INTO employee (first_name, last_name, role_id) VALUES ("${answers.first_name}", "${answers.last_name}", ${id[0].id})`
            );
          }
        );
      })
      .then(() => {
        db.query(
          `SELECT id, CONCAT(first_name, " ", last_name) AS manager FROM employee WHERE manager_id IS NULL`,
          (err, data) => {
            if (err) throw err;
            const supervisors = JSON.parse(JSON.stringify(data));
            const managers = supervisors.map(
              (supervisor) => supervisor.manager
            );
            managers.unshift("None");
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "manager",
                  message: "Who is the employee's manager?",
                  choices: managers,
                },
              ])
              .then((choice) => {
                let setManagerId;
                if (choice.manager === "None") {
                  setManagerId = null;
                } else {
                  supervisors.forEach((supervisor) => {
                    if (supervisor.manager === choice.manager) {
                      setManagerId = supervisor.id;
                    }
                  });
                }
                db.query(
                  `UPDATE employee SET manager_id = ${setManagerId} WHERE id = (SELECT MAX(id) FROM (SELECT * FROM employee) AS worker)`
                );
              })
              .then(() => options())
              .catch((err) => console.error(err));
          }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .catch((err) => console.error(err));
}



const UpdateEmployee = () => {
    db.promise()
    
    .query(
        "UPDATE employee.id SET role_id = '?' WHERE ID = '?'"
    ).then((data) => console.log(data))
    .then(() => options())
    .catch((err) => console.log(err))
};
options()