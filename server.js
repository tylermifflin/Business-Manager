// calling inquirer and mysql
const inquirer = require('inquirer');
const mysql = require('mysql2');

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

// function to start the application
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

// function to view all employees and view the table in the console
function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
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
            name: 'department',
            type: 'input',
            message: 'Which department does this role belong to?'
        }
    ])
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
            name: 'role',
            type: 'list',
            message: 'What is the employee\'s role?'
        },
        {
            name: 'manager',
            type: 'input',
            message: 'Who is the employee\'s manager?'
        }
    ])
    .then((answer) => {
        db.query('INSERT INTO employee SET ?', answer, function (err, results) {
            console.table(results);
            start();
        });
    });
}


// function to update an employee's role
function updateEmployeeRole() {
    inquirer
    .prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the employee\'s name'
        },
        {
            name: 'role',
            type: 'input',
            message: 'What is the employee\'s new role ?'
        }
    ])
    .then((answer) => {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.role_id, answer.id], function (err, results) {
            console.table(results);
            start();
        });
    });
}

// function to initialize app
function init() {
    start();
}

// function call to initialize app
init();
