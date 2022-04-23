const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

//GET all departments
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

//GET a single party
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

// //GET all roles from a single department
// router.get("/departments/:id/roles", (req, res) => {
// 	const sql = `SELECT * FROM roles WHERE department_id = ?`;
// 	const params = [req.params.id];
// 	db.query(sql, params, (err, row) => {
// 		if (err) {
// 			res.status(400).json({ error: err.message });
// 			return;
// 		}
// 		res.json({
// 			message: "success",
// 			data: row,
// 		});
//     });

// });

//GET all employees from a single department

module.exports = router;
