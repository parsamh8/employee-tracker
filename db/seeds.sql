

INSERT INTO departments (name)
VALUES ('Engineerin'),
       ('Finance'),
       ('Legal'),
       ('Sales');

INSERT INTO roles (title, salary, department)
VALUES ('Sales Lead', 100000, 4),
       ('Salesperson', 80000, 4),
       ('Lead Engineer', 150000, 1),
       ('Software Engineer', 120000, 1),
       ('Accountant Manager', 160000, 2),
       ('Accountant', 125000, 2),
       ('Legal Team Lead', 250000, 3),
       ('Lawyer', 190000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Ethan', 'Miller', 3, NULL),
       ('Olivia', 'Johnson', 4, 1),
       ('Jacob', 'Carter', 1, NULL),
       ('Ava', 'Thompson', 2, 3),
       ('Noah', 'White', 6, NULL),
       ('Sophia', 'Harris', 5, 5),
       ('Mason', 'Clark', 8, NULL),
       ('Emily', 'Walker', 7, 7);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;


SELECT 
    e.id, 
    e.first_name, 
    e.last_name, 
    r.title, 
    d.name AS department, 
    r.salary, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM 
    employees e
JOIN 
    roles r ON e.role_id = r.id
JOIN 
    departments d ON r.department = d.id
LEFT JOIN 
    employees m ON e.manager_id = m.id;