// calling inquirer and mysql and console.table
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// connect to database
const db = mysql.createConnection(
    { host: 'localhost',
     // MySQL username,
     user: 'root',
    // MySQL password
    password: '',
    database: 'manager_db'
    },
    console.log('Connected to the manager_db database.')
);

// function to start the application, using a list type to display the choices, and then using a switch statement to run the function based on the choice
function start() {
    inquirer
    .prompt({
        name: 'start',
        type: 'list',
        message: 'What would you like to do?',
        choices: [ 'View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee','Update Employee Role', 'Exit']
    })
    .then((answer) => {
        switch (answer.start) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                    addEmployee();
                    break;    
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Exit':
                db.end();
                break;
        }
    }
    )
}

// function to view all departments
function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        start();
    });
}

// function to view all roles using my query.sql to join the tables for role and department
function viewAllRoles() {
    db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM department JOIN role ON department_id = department.id', function (err, results) {
        console.table(results);
        start();
    });
}

// function to view all employees and view the table in the console, using my 2nd query.sql to join the tables for employee to look as desired
function viewAllEmployees() {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id', function (err, results) {
        console.table(results);
        start();
    });
}

// function to add a department
function addDepartment() {
    inquirer
    .prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the department\'s name?'
        }
    ])
    // put the answers into the department table
    .then((answer) => {
        db.query('INSERT INTO department SET ?', answer, function (err, results) {
            console.table(results);
            start();
        });
    });
}

// function to add a role
function addRole() {
    inquirer
    .prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the role\'s title?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the role\'s salary?'
        },
        {
            name: 'department_id',
            type: 'input',
            message: 'What is the role\'s department id?'

        },
       
    ])
  // put the answers into the role table
    .then((answer) => {
        db.query('INSERT INTO role SET ?', answer, function (err, results) {
            console.table(results);
            start();
        });
    });
}

// function to add an employee
function addEmployee() {
    inquirer
    .prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'What is the employee\'s first name?'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is the employee\'s last name?'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'What is the employee\'s role id?'
        },
        {
            name: 'manager_id',
            type: 'input',
            message: 'What is the employee\'s manager id?'
        }
    ])
    // put the answers into the employee table
    .then((answer) => {
        db.query('INSERT INTO employee SET ?', answer, function (err, results) {
            console.table(results);
            start();
        });
    });
}


// function to update an employee's role, need to use the id to update the employee's role
function updateEmployeeRole() {
    inquirer
    .prompt([
        {
            name: 'id',
            type: 'input',
            message: 'What is the employee\'s id?'
        },
        {
            name: 'first_name',
            type: 'input',
            message: 'What is the employee\'s first name?'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is the employee\'s last name?'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'What is the employee\'s role id?'
        },
        {
            name: 'manager_id',
            type: 'input',
            message: 'What is the employee\'s manager id?'
        }
    ])
    // used my query to update the employee's role in query.sql
    .then((answers) => {
        const { id, first_name, last_name, role_id, manager_id } = answers;
        const query = `UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?`;
        const values = [first_name, last_name, role_id, manager_id, id];
        db.query(query, values, function (err, results) {
                console.table(results);
                start();
            }
        );
    });
}
// function to initialize app
function init() {
    start();
}

// function call to initialize app
init();
