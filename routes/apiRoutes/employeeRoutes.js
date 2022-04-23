const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputChecker = require("../../utils/inputChecker");

//GET all employees
router.get("/employees", (req, res) => {
	const sql = "SELECT * FROM employees";

	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({
			message: "success",
			data: rows,
		});
	});
});

//GET a single employee
router.get("/employees/:id", (req, res) => {
	const sql = `SELECT * FROM employees WHERE id = ?`;
	const params = [req.params.id];
	db.query(sql, params, (err, row) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: "success",
			data: row,
		});
	});
});

// Create a new employee
router.post("/employees", ({ body }, res) => {
	const errors = inputChecker(body, "first_name", "last_name", "role_id");
	if (errors) {
		res.status(400).json({ error: errors });
		return;
	}

	const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;

	const params = [
		body.first_name,
		body.last_name,
		body.role_id,
		body.manager_id,
	];

	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: "success",
			data: body,
		});
	});
});

//DELETE a department
router.delete("/employees/:id", (req, res) => {
	const sql = `DELETE FROM employees WHERE id = ?`;
	const params = [req.params.id];
	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: res.message });
			// checks if anything was deleted
		} else if (!result.affectedRows) {
			res.json({
				message: "Employee not found",
			});
		} else {
			res.json({
				message: "deleted",
				changes: result.affectedRows,
				id: req.params.id,
			});
		}
	});
});

module.exports = router;
