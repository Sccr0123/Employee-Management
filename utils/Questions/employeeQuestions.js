const employeeQuestions = [
	{
		type: "input",
		name: "firstname",
		message: "New Employee's First Name?",
		validate(answers) {
			if (answers.firstname != "" || null) {
				return true;
			} else {
				return false;
			}
		},
	},
	{
		type: "input",
		name: "lastname",
		message: "New Employee's Last Name?",
		validate(answers) {
			if (answers.lastname != "" || null) {
				return true;
			} else {
				return false;
			}
		},
	},
	{
		type: "input",
		name: "role",
		message: "New Employee's Role ID?",
		validate(answers) {
			if (answers.role != "" || null) {
				return true;
			} else {
				return false;
			}
		},
	},
	{
		type: "input",
		name: "manager",
		message: "New Employee's Manager ID?",
	},
];

module.exports = employeeQuestions;
