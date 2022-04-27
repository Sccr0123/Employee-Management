const baseQuestions = [
	{
		type: "list",
		name: "options",
		message: "What would you like to do?",
		choices: [
			"List Departments",
			"Add Department",
			"Update Department",
			"Delete Department",
			"Department Salary",
			"List Roles",
			"Add Role",
			"Update Role",
			"Delete Role",
			"List Employees",
			"Add Employee",
			"Update Employee",
			"Delete Employee",
			"End",
		],
	},
];

module.exports = baseQuestions;
