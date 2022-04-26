const baseQuestions = [
	{
		type: "checkbox",
		name: "options",
		message: "What would you like to do?",
		choices: [
			"List Departments",
			"Add Department",
			"Update Department",
			"List Roles",
			"Add Role",
			"Update Role",
			"List Employees",
			"Add Employee",
			"Update Employee",
		],
	},
];

module.exports = baseQuestions;
