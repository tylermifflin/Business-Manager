// calling express, inquirer, fs, path, and mysql
const express = require('express');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection(
    {   
