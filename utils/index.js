require("console.table");
const { prompt } = require("inquirer");
const db = require("../db/index");

const baseQuestions = require("./Questions/baseQuestions");
const departmentQuestions = require("./Questions/departmentQuestions");
const roleQuestions = require("./Questions/rolesQuestions");
const employeeQuestions = require("./Questions/employeeQuestions");

function ListDepartments() {
	db.ListDepartments().then(([departments]) => {
		console.log("\n");
		console.table(departments);
		baseQuestion();
	});
}

function AddDepartment() {
	prompt(departmentQuestions).then(async (answers) => {
		await db.AddDepartment(answers.name);
		console.log("Added Department!");
		baseQuestion();
	});
}

function UpdateDepartment() {
	db.ListDepartments().then(([departments]) => {
		const departmentChoices = departments.map(({ ID, Name }) => ({
			name: `${Name}`,
			value: ID,
		}));

		prompt([
			{
				type: "list",
				name: "department",
				message: "Which Department Would You Like To Update?",
				choices: departmentChoices,
			},
		]).then((res) => {
			let departmentId = res.department;

			prompt([
				{
					type: "input",
					name: "name",
					message: "New Department Name?",
					validate(answers) {
						if (answers.name != "" || null) {
							return true;
						} else {
							return false;
						}
					},
				},
			]).then(async (res) => {
				await db.UpdateDepartment(employeeId, res.name);
				console.log("\n Updated Department Name! \n");
				baseQuestion();
			});
		});
	});
}

function DeleteDepartment() {
	db.ListDepartments().then(([departments]) => {
		const departmentChoices = departments.map(({ ID, Name }) => ({
			name: `${Name}`,
			value: ID,
		}));

		prompt([
			{
				type: "list",
				name: "department",
				message: "Which Department Would You Like To Delete?",
				choices: departmentChoices,
			},
		]).then((res) => {
			db.DeleteDepartment(res.department);
			console.log("Deleted Department!");
			baseQuestion();
		});
	});
}

function GetDepartmentSalary() {
	db.ListDepartments().then(([departments]) => {
		const departmentChoices = departments.map(({ ID, Name }) => ({
			name: `${Name}`,
			value: ID,
		}));

		prompt([
			{
				type: "list",
				name: "department",
				message: "Which Department Would You Like To Total?",
				choices: departmentChoices,
			},
		]).then((res) => {
			db.GetSalary(res.department).then((res) => {
				let salaries = res[0];
				let total = 0;
				for (let i = 0; i < salaries.length; i++) {
					total = total + parseFloat(salaries[i].salary);
				}
				console.log(`\n$${total}\n`);

				baseQuestion();
			});
		});
	});
}

function ListRoles() {
	db.ListRoles().then(([roles]) => {
		console.log("\n");
		console.table(roles);
		baseQuestion();
	});
}

function AddRole() {
	prompt(roleQuestions).then(async (answers) => {
		await db.AddRole(answers.title, answers.salary, answers.department);
		console.log("Added Role!");
		baseQuestion();
	});
}

// -----Start Of UpdateRole Function -----

function UpdateRole() {
	prompt([
		{
			type: "list",
			name: "answer",
			message: "Which Role Aspect Would You Like To Update?",
			choices: ["Title", "Salary", "Department"],
		},
	]).then((res) => {
		switch (res.answer) {
			case "Title":
				UpdateRoleTitle();
				break;

			case "Salary":
				UpdateRoleSalary();
				break;

			case "Department":
				UpdateRoleDepartment();
				break;
		}
	});
}

// -----Start Of UpdateRoleTitle Function -----
function UpdateRoleTitle() {
	db.ListRoles().then(([roles]) => {
		const rolesChoices = roles.map(({ ID, Title }) => ({
			name: `${Title}`,
			value: ID,
		}));

		prompt([
			{
				type: "list",
				name: "roles",
				message: "Which Role Would You Like To Update?",
				choices: rolesChoices,
			},
		]).then((res) => {
			let roleId = res.roles;

			prompt([
				{
					type: "input",
					name: "title",
					message: "Updated Title?",
					validate(answers) {
						if (answers.title != "" || null) {
							return true;
						} else {
							return false;
						}
					},
				},
			]).then(async (res) => {
				await db.UpdateRoleTitle(roleId, res.title);
				console.log("\n Updated Role's Title! \n");
				baseQuestion();
			});
		});
	});
}
// ----- End of UpdateRoleTitle Function -----

// -----Start Of UpdateRoleSalary Function -----
function UpdateRoleSalary() {
	db.ListRoles().then(([roles]) => {
		const rolesChoices = roles.map(({ ID, Title }) => ({
			name: `${Title}`,
			value: ID,
		}));

		prompt([
			{
				type: "list",
				name: "roles",
				message: "Which Role Would You Like To Update?",
				choices: rolesChoices,
			},
		]).then((res) => {
			let roleId = res.roles;

			prompt([
				{
					type: "input",
					name: "salary",
					message: "Updated Salary?",
					validate(answers) {
						if (answers.salary != null) {
							return true;
						} else {
							return false;
						}
					},
				},
			]).then(async (res) => {
				await db.UpdateRoleSalary(roleId, res.salary);
				console.log("\n Updated Role's Salary! \n");
				baseQuestion();
			});
		});
	});
}
// ----- End of UpdateRoleSalary Function -----

// -----Start Of UpdateRoleDepartment Function -----
function UpdateRoleDepartment() {
	db.ListRoles().then(([roles]) => {
		const rolesChoices = roles.map(({ ID, Title }) => ({
			name: `${Title}`,
			value: ID,
		}));

		prompt([
			{
				type: "list",
				name: "roles",
				message: "Which Role Would You Like To Update?",
				choices: rolesChoices,
			},
		]).then((res) => {
			let roleId = res.roles;

			prompt([
				{
					type: "input",
					name: "department",
					message: "Updated Department ID?",
					validate(answers) {
						if (answers.department != null) {
							return true;
						} else {
							return false;
						}
					},
				},
			]).then(async (res) => {
				await db.UpdateRoleDepartment(roleId, res.department);
				console.log("\n Updated Role's Department! \n");
				baseQuestion();
			});
		});
	});
}
// ----- End of UpdateRoleDepartment Function -----

// ----- End of UpdateRole Function -----

function DeleteRole() {
	db.ListRoles().then(([roles]) => {
		const roleChoices = roles.map(({ ID, Title }) => ({
			name: `${Title}`,
			value: ID,
		}));

		prompt([
			{
				type: "list",
				name: "roles",
				message: "Which Role Would You Like To Delete?",
				choices: roleChoices,
			},
		]).then((res) => {
			db.DeleteRole(res.roles);
			console.log("Deleted Role!");
			baseQuestion();
		});
	});
}

function ListEmployees() {
	db.ListEmployees().then(([employees]) => {
		console.log("\n");
		console.table(employees);
		baseQuestion();
	});
}

function AddEmployee() {
	prompt(employeeQuestions).then(async (answers) => {
		await db.AddEmployee(
			answers.firstname,
			answers.lastname,
			answers.role,
			answers.manager
		);
		console.log("Added Employee!");
		baseQuestion();
	});
}

// -----Start Of UpdateEmployee Function -----

function UpdateEmployee() {
	prompt([
		{
			type: "list",
			name: "answer",
			message: "Which Employee's Role Would You Like To Update?",
			choices: ["First Name", "Last Name", "Role", "Manager"],
		},
	]).then((res) => {
		switch (res.answer) {
			case "First Name":
				UpdateEmployeeFirstName();
				break;

			case "Last Name":
				UpdateEmployeeLastName();
				break;

			case "Role":
				UpdateEmployeeRole();
				break;

			case "Manager":
				UpdateEmployeeManager();
				break;
		}
	});
}

// ----- Start of UpdateEmployeeFirst -----
function UpdateEmployeeFirst() {
	db.ListEmployees().then(([employees]) => {
		const employeeChoices = employees.map(({ ID, First, Last }) => ({
			name: `${First} ${Last}`,
			value: ID,
		}));

		prompt([
			{
				type: "list",
				name: "employee",
				message:
					"Which Employee's First Name Would You Like To Update?",
				choices: employeeChoices,
			},
		]).then((res) => {
			let employeeId = res.employee;

			prompt([
				{
					type: "input",
					name: "firstname",
					message: "Updated First Name?",
					validate(answers) {
						if (answers.firstname != "" || null) {
							return true;
						} else {
							return false;
						}
					},
				},
			]).then(async (res) => {
				await db.UpdateEmployeeRole(employeeId, res.firstname);
				console.log("\n Updated Employee's First Name! \n");
				baseQuestion();
			});
		});
	});
}
// ----- End of UpdateEmployeeFirst function -----

// ----- Start of UpdateEmployeeLast -----
function UpdateEmployeeLast() {
	db.ListEmployees().then(([employees]) => {
		const employeeChoices = employees.map(({ ID, First, Last }) => ({
			name: `${First} ${Last}`,
			value: ID,
		}));

		prompt([
			{
				type: "list",
				name: "employee",
				message: "Which Employee's Last Name Would You Like To Update?",
				choices: employeeChoices,
			},
		]).then((res) => {
			let employeeId = res.employee;

			prompt([
				{
					type: "input",
					name: "lastname",
					message: "Updated Last Name?",
					validate(answers) {
						if (answers.lastname != "" || null) {
							return true;
						} else {
							return false;
						}
					},
				},
			]).then(async (res) => {
				await db.UpdateEmployeeRole(employeeId, res.lastname);
				console.log("\n Updated Employee's Last Name! \n");
				baseQuestion();
			});
		});
	});
}
// ----- End of UpdateEmployeeLast function -----

// ----- Start of UpdateEmployeeRole -----
function UpdateEmployeeRole() {
	db.ListEmployees().then(([employees]) => {
		const employeeChoices = employees.map(({ ID, First, Last }) => ({
			name: `${First} ${Last}`,
			value: ID,
		}));

		prompt([
			{
				type: "list",
				name: "employee",
				message: "Which Employee's Role Would You Like To Update?",
				choices: employeeChoices,
			},
		]).then((res) => {
			let employeeId = res.employee;
			db.ListRoles().then(([roles]) => {
				// Mapping role choices to show name of role and value of selection is the ID of chosen role
				const roleChoices = roles.map(({ id, title }) => ({
					name: title,
					value: id,
				}));

				prompt([
					{
						type: "list",
						name: "roles",
						message: "Which Role Do You Want To Change To?",
						choices: roleChoices,
					},
				]).then(async (res) => {
					await db.UpdateEmployeeRole(employeeId, res.roles);
					console.log("\n Updated Employee's Role! \n");
					baseQuestion();
				});
			});
		});
	});
}
// ----- End of UpdateEmployeeRole function -----

// ----- Begin UpdateEmployeeManager function -----

function UpdateEmployeeManager() {
	db.ListEmployees().then(([employees]) => {
		const employeeChoices = employees.map(({ ID, First, Last }) => ({
			name: `${First} ${Last}`,
			value: ID,
		}));

		prompt([
			{
				type: "list",
				name: "employee",
				message: "Which Employee's Manager Would You Like To Update?",
				choices: employeeChoices,
			},
		]).then((res) => {
			let employeeId = res.employee;
			prompt([
				{
					type: "list",
					name: "manager",
					message: "Who Is Their Manager?",
					choices: employeeChoices,
				},
			]).then(async (res) => {
				await db.UpdateEmployeeManager(employeeId, res.manager);
				console.log("\n Updated Employee's Manager! \n");
				baseQuestion();
			});
		});
	});
}
// ----- End of UpdateEmployeeManager function -----

// ----- End of UpdateEmployee function -----

function DeleteEmployee() {
	db.ListEmployees().then(([employees]) => {
		const employeeChoices = employees.map(({ ID, First, Last }) => ({
			name: `${First} ${Last}`,
			value: ID,
		}));

		prompt([
			{
				type: "list",
				name: "employee",
				message: "Which Employee Would You Like To Delete?",
				choices: employeeChoices,
			},
		]).then((res) => {
			db.DeleteEmployee(res.employee);
			console.log("Deleted Role!");
			baseQuestion();
		});
	});
}

function TheEnd() {
	console.log("*dies*");
}

function baseQuestion() {
	prompt(baseQuestions).then((answers) => {
		switch (answers.options) {
			case "List Departments":
				ListDepartments();
				break;

			case "Add Department":
				AddDepartment();
				break;

			case "Update Department":
				UpdateDepartment();
				break;

			case "Delete Department":
				DeleteDepartment();
				break;

			case "Department Salary":
				GetDepartmentSalary();
				break;

			case "List Roles":
				ListRoles();
				break;

			case "Add Role":
				AddRole();
				break;

			case "Update Role":
				UpdateRole();
				break;

			case "Delete Role":
				DeleteRole();
				break;

			case "List Employees":
				ListEmployees();
				break;

			case "Add Employee":
				AddEmployee();
				break;

			case "Update Employee":
				UpdateEmployee();
				break;

			case "Delete Employee":
				DeleteEmployee();
				break;

			case "End":
				TheEnd();
				break;

			default:
				console.log("Error");
				break;
		}
	});
}

module.exports = baseQuestion;
