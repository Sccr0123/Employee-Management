const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

//GET all departments
router.get("/api/", (req, res) => {
	db.query("SELECT * FROM departments", function (err, results) {
		if (err) {
			console.log(err);
			return;
		}
		res.json(results);
	});
});
