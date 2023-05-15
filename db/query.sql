SELECT role.id, role.title, department.name AS department, role.salary
FROM department
JOIN role ON department_id = department.id;