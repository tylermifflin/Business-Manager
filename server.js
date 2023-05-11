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
