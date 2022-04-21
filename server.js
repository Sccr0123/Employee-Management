//Requires npm libraries
const express = require("express");
const mysql = require("mysql2");

//Imports user-defined modules
const inputCheck = require("./utils/inputCheck");
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");

//Sets PORT and creates app
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use("/api", apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
	res.status(404).end();
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
