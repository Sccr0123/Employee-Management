const departmentQuestions = [
	{
		type: "input",
		name: "name",
		message: "New Department's Name?",
		validate(answers) {
			if (answers.name != "" || null) {
				return true;
			} else {
				return false;
			}
		},
	},
];

module.exports = departmentQuestions;
