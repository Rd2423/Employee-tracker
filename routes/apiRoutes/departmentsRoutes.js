const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

router.get("/departments", (req, res) => {
  const sql = `SELECT * FROM departments`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "Heres the departments",
      data: rows,
    });
  });
});

router.get("/department/:id", (req, res) => {
  const sql = `SELECT * FROM departments WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Here's the department",
      data: row,
    });
  });
});

router.delete("/department/:id", (req, res) => {
  const sql = `DELETE FROM parties WHERE id = ?`;

  db.query(sql, req.params.id, (err, results) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedrow) {
      res.json({
        message: "Department not found",
      });
    } else {
      res.json({
        message: "Deleted",
        changes: result.affectedrow,
        id: req.params.id
      });
    }
  });
});

module.exports = router;