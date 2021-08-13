DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;


CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    departments_name VARCHAR(35) NOT NULL,
    description TEXT
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_id INTEGER,
    role_id INTEGER,
    job_title VARCHAR(40) NOT NULL,
    salary int,
    CONSTRAINT dp_departments
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE SET NULL
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(12) NOT NULL, 
    last_name VARCHAR(15) NOT NULL,
    job_title VARCHAR(40) NOT NULL,
    departments_name VARCHAR(35) NOT NULL,
    salary int, 
    name_of_manager
)