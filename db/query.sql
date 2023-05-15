SELECT role.id, role.title, department.name AS department, role.salary
FROM department
JOIN role ON department_id = department.id; 


SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager_id AS manager
FROM employee
JOIN role ON role_id = role.id
JOIN department ON department_id = department.id;
