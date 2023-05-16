--query to view all roles
SELECT role.id, role.title, department.name AS department, role.salary
FROM department
JOIN role ON department_id = department.id; 

-- query to view all employees
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee 
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id;

--query to update an employee's role
UPDATE employee
SET first_name = 'Jack',
last_name = 'Mihoff',
role_id = 2,
manager_id = 1
WHERE id= 2;


