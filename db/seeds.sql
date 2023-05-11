INSERT INTO department (name) 
VALUES("Sales"),
      ("Engineering"),
      ("Human Resources"),
      ("Customer Service");

INSERT INTO role (title, salary, department_id) 
VALUES("Sales Lead", 150000, 1),
      ("Salesperson", 80000, 1),
      ("Lead Engineer", 150000, 2),
      ("Software Engineer", 120000, 2),
      ("HR Manager", 100000, 3),
      ("HR Coordinator", 60000, 3),
      ("Lead Customer Service Agent", 80000, 4),
      ("Customer Service Agent", 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES("Jay", "Mann", 1, NULL),
      ("Mikey", "Smith", 2, 1),
      ("Sam", "Meyers", 3, NULL),
      ("Kevin", "Hart", 4, 3),
      ("Maddie", "White", 5, NULL),
      ("Sarah", "Green", 6, 5),
      ("Thomas", "Jones", 7, NULL),
      ("Becca", "Johnson", 8, 7);



