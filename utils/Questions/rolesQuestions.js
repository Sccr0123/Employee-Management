const roleQuestions = [
	{
		type: "input",
		name: "title",
		message: "New Role's Title?",
		validate(answers) {
			if (answers.title != "" || null) {
				return true;
			} else {
				return false;
			}
		},
	},
	{
		type: "input",
		name: "salary",
		message: "New Role's Salary?",
		validate(answers) {
			if (answers.salary != "" || null) {
				return true;
			} else {
				return false;
			}
		},
	},
	{
		type: "input",
		name: "department",
		message: "New Role's Department ID?",
		validate(answers) {
			if (answers.department != "" || null) {
				return true;
			} else {
				return false;
			}
		},
	},
];

module.exports = roleQuestions;
