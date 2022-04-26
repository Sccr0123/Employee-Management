const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputChecker = require("../../utils/inputChecker");

//GET all roles
router.get("/roles", (req, res) => {
	const sql = "SELECT * FROM roles";

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

//GET a single role
router.get("/roles/:id", (req, res) => {
	const sql = `SELECT * FROM roles WHERE id = ?`;
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

//GET all employees from a single role
router.get("/roles/:id/employees", (req, res) => {
	const sql = `SELECT * FROM employees WHERE role_id = ?`;
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

//GET all employees from a single department

// Create a new role
router.post("/roles", ({ body }, res) => {
	const errors = inputChecker(body, "title", "salary", "department_id");
	if (errors) {
		res.status(400).json({ error: errors });
		return;
	}

	const sql = `INSERT INTO roles (title, salary, department_id)
                    VALUES (?, ?, ?)`;

	const params = [body.title, body.salary, body.department_id];

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

// PUT updates to one role
router.put("/roles/:id", (req, res) => {
	let affectedRows = 0;
	if (req.body.title != null) {
		updateTitle(req, res);
		affectedRows++;
	}
	if (req.body.salary != null) {
		updateSalary(req, res);
		affectedRows++;
	}
	if (req.body.department_id != null) {
		updateDepartmentId(req, res);
		affectedRows++;
	}

	if (req.body) {
		res.json({
			message: "success",
			data: req.body,
			changes: affectedRows,
		});
	} else {
		res.json({
			error: "Input not valid!",
		});
	}
});

function updateTitle(req, res) {
	const errors = inputChecker(req.body, "title");

	if (errors) {
		res.status(400).json({ error: errors });
		return;
	}

	const sql = `UPDATE roles SET title = ?
                    WHERE id = ?`;

	const params = [req.body.title, req.params.id];

	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			// check if a record was found
		} else if (!result.affectedRows) {
			res.json({
				message: "Role not found",
			});
		} else {
			return;
		}
	});
}

function updateSalary(req, res) {
	const errors = inputChecker(req.body, "salary");

	if (errors) {
		res.status(400).json({ error: errors });
		return;
	}

	const sql = `UPDATE roles SET salary = ?
                    WHERE id = ?`;

	const params = [req.body.salary, req.params.id];

	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			// check if a record was found
		} else if (!result.affectedRows) {
			res.json({
				message: "Role not found",
			});
		} else {
			return;
		}
	});
}

function updateDepartmentId(req, res) {
	const errors = inputChecker(req.body, "department_id");

	if (errors) {
		res.status(400).json({ error: errors });
		return;
	}

	const sql = `UPDATE roles SET department_id = ?
                    WHERE id = ?`;

	const params = [req.body.department_id, req.params.id];

	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			// check if a record was found
		} else if (!result.affectedRows) {
			res.json({
				message: "Role not found",
			});
		} else {
			return;
		}
	});
}

module.exports = router;
