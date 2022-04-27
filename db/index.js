const connection = require("./connection");

class Database {
	constructor(connection) {
		this.connection = connection;
	}

	ListDepartments() {
		return this.connection
			.promise()
			.query("SELECT id as ID, name AS Name FROM departments");
	}

	AddDepartment(Name) {
		return this.connection.promise().query(
			`INSERT INTO departments (name)
                        VALUES (?)`,
			[Name]
		);
	}

	UpdateDepartment(ID, Name) {
		return this.connection.promise().query(
			`UPDATE departments SET name = ?
                    WHERE id = ?`,
			[Name, ID]
		);
	}

	DeleteDepartment(ID) {
		return this.connection
			.promise()
			.query(`DELETE FROM departments WHERE id = ?`, [ID]);
	}

	ListRoles() {
		return this.connection
			.promise()
			.query(
				"SELECT roles.id AS ID, roles.title AS Title, departments.name AS department, roles.salary AS Salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id"
			);
	}

	AddRole(title, salary, department) {
		return this.connection.promise().query(
			`INSERT INTO roles (title, salary, department_id)
                    VALUES (?, ?, ?)`,
			[title, salary, department]
		);
	}

	UpdateRoleTitle(ID, Title) {
		return this.connection.promise().query(
			`UPDATE roles SET title = ?
                    WHERE id = ?`,
			[Title, ID]
		);
	}

	UpdateRoleSalary(ID, Salary) {
		return this.connection.promise().query(
			`UPDATE roles SET salary = ?
                    WHERE id = ?`,
			[Salary, ID]
		);
	}

	UpdateRoleDepartment(ID, Department) {
		return this.connection.promise().query(
			`UPDATE roles SET department_id = ?
                    WHERE id = ?`,
			[Department, ID]
		);
	}

	DeleteRole(ID) {
		return this.connection
			.promise()
			.query(`DELETE FROM roles WHERE id = ?`, [ID]);
	}

	ListEmployees() {
		return this.connection
			.promise()
			.query(
				"SELECT employees.id AS ID, employees.first_name AS First, employees.last_name AS Last, roles.title AS Role, departments.name AS Department, roles.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id"
			);
	}

	AddEmployee(First, Last, Role, Manager) {
		return this.connection.promise().query(
			`INSERT INTO employees (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`,
			[First, Last, Role, Manager]
		);
	}

	UpdateEmployeeFirst(ID, FirstName) {
		return this.connection.promise().query(
			`UPDATE employees SET first_name = ?
                    WHERE id = ?`,
			[FirstName, ID]
		);
	}

	UpdateEmployeeLast(ID, LastName) {
		return this.connection.promise().query(
			`UPDATE employees SET last_name = ?
                    WHERE id = ?`,
			[LastName, ID]
		);
	}

	UpdateEmployeeRole(ID, Role) {
		return this.connection.promise().query(
			`UPDATE employees SET role_id = ?
                    WHERE id = ?`,
			[Role, ID]
		);
	}

	UpdateEmployeeManager(ID, Manager) {
		return this.connection.promise().query(
			`UPDATE employees SET manager_id = ?
                    WHERE id = ?`,
			[Manager, ID]
		);
	}

	DeleteEmployee(ID) {
		return this.connection
			.promise()
			.query(`DELETE FROM employees WHERE id = ?`, [ID]);
	}

	GetSalary(ID) {
		return this.connection
			.promise()
			.query("SELECT salary FROM roles WHERE department_id = ?", [ID]);
	}
}

module.exports = new Database(connection);
