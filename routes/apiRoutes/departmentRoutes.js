const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputChecker = require("../../utils/inputChecker");

//GET all departments
router.get("/departments", (req, res) => {
	const sql = "SELECT * FROM departments";

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

//GET a single party
router.get("/departments/:id", (req, res) => {
	const sql = `SELECT * FROM departments WHERE id = ?`;
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

//GET all roles from a single department
router.get("/departments/:id/roles", (req, res) => {
	const sql = `SELECT * FROM roles WHERE department_id = ?`;
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

//GET all employees from a single department (For Fun / Extra Credit)

// Create a new department
router.post("/departments", ({ body }, res) => {
	const errors = inputChecker(body, "name");
	if (errors) {
		res.status(400).json({ error: errors });
		return;
	}

	const sql = `INSERT INTO departments (name)
                    VALUES (?)`;

	const params = [body.name];

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

//DELETE a party
router.delete("/departments/:id", (req, res) => {
	const sql = `DELETE FROM departments WHERE id = ?`;
	const params = [req.params.id];
	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: res.message });
			// checks if anything was deleted
		} else if (!result.affectedRows) {
			res.json({
				message: "Party not found",
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
