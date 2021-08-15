USE employeeRecord;

INSERT INTO department (name)
VALUES
('Systems and Technology'),
('Finance'),
('Legal'),
("HR"),
('Security'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Web Developer', 90000, 1),
('Accountant', 70000, 2),
('Paralegal', 50000, 3),
('Manager', 70000, 4),
('Engineer', 90000, 5),
('Sales Rep', 40000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Yussef','Rafat', 1, 590),
('John','Doe', 2, 591),
('Rayan', 'Diouf', 3, 592),
('Abdel', 'Daoud', 4, 593),
('Jason', 'L', 5, 594),
('Linda','Lupa', 6, 595);