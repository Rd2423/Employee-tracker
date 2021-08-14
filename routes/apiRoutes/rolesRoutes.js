const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

router.get("/roles", (req, res) => {
  const sql = `SELECT roles.*, departments.departments_name
                    AS departmentname
                    FROM roles
                    LEFT JOIN departments
                    ON roles.department_id = departments.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "Here's the roles",
      data: rows
    });
  });
});

router.get("/roles/:id", (req, res) => {
    const sql = `SELECT roles.*, departments.departments_name
                    AS departmentname
                    FROM roles
                    LEFT JOIN departments
                    ON roles.department_id = departments.id
                    WHERE roles.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Here's the role",
      data: row,
    });
  });
});

router.post('/roles', ({body}, res) => {
  const error = inputCheck(
    body, 'role_id', 'job_title', 'salary'
  );
  if (error){
    res.status(400).json({error: error});
    return;
  }
  const sql = `INSERT INTO roles (role_id, job_title, salary)`;
  const params = [
    body.role_id, 
    body.job_title,
    body.salary
  ];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'role added to the database',
      data: body
    })
  })
})

router.delete("/roles/:id", (req, res) => {
  const sql = `DELETE FROM roles WHERE id = ?`;

  db.query(sql, req.params.id, (err, results) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedrow) {
      res.json({
        message: "role not found",
      });
    } else {
      res.json({
        message: "Role deleted",
        changes: result.affectedrow,
        id: req.params.id
      });
    }
  });
});