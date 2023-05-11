// calling express, inquirer, fs, path, and mysql
//const express = require('express');
const inquirer = require('inquirer');
//const fs = require('fs');
//const path = require('path');
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
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add Department', 'Add Role', 'Update Employee Role', 'Exit']
    })
    .then((answer) => {
        switch (answer.start) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
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

// function to view all employees
function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.log(results);
        start();
    });
}

// function to view all departments
function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
        start();
    });
}

// function to view all roles
function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.log(results);
        start();
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
    .then((answer) => {
        db.query('INSERT INTO employee SET ?', answer, function (err, results) {
            console.log(results);
            start();
        });
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
            console.log(results);
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
        }
    ])