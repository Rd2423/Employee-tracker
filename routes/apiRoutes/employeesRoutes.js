const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employees`

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "here's all the employees",
            data: rows
        })
    })
})

router.get('/employee/:id', (req, res) => {
    const sql = `SELECT * FROM employees WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err){
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "Here's the employee",
            data: row
        })
    })
})

router.post('/employee', ({ body }, res) => {
    const error = inputCheck(body, 'first_name', 'last_name', 'job_title', 'salary', 'name_of_manager')
    if (error) {
        res.status(400).json({ error: error });
        return;
    }
    const sql = `INSERT INTO employees (first_name, last_name, job_title, salary, name_of_manager) VALUES (?,?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.job_title, body.salary, body.name_of_manager];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "You've just added a new employee",
            data: body
        })
    })
})

router.put('/employee/:id', (req, res) => {
    const errors = inputCheck(req.body, 'email');
    if(errors) {
        res.status(400).json({ error: errors});
        return;
    }

    const sql = `UPDATE employees SET job_title = ? WHERE id = ?`;
    const params = [req.body.job_title, req.params.id];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows){
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'Employee updated',
                data: req.body,
                changes: result.affectedRows
            })
        }
    })
})