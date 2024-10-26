import inquirer from 'inquirer';
import { pool, connectToDb } from './connection.js';
import colors from 'colors';
await connectToDb();
const basePrompt = () => {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'Add Department', 'View All Roles', 'Add Role', 'View All Employees', 'Add Employee', 'Update Employee Role']
        }
    ])
        .then(res => {
        console.log(res.choice);
        if (res.choice === 'View All Departments') {
            getAllDepartment();
        }
        if (res.choice === 'Add Department') {
            createDepartment();
        }
        if (res.choice === 'View All Roles') {
            getAllRole();
        }
        if (res.choice === 'Add Role') {
            createRole();
        }
        if (res.choice === 'View All Employees') {
            getAllEmployee();
        }
        if (res.choice === 'Add Employee') {
            createEmployee();
        }
        if (res.choice === 'Update Employee Role') {
            updateEmployeeRole();
        }
    });
};
// -------------------department----------------------
const getAllDepartment = () => {
    pool.query('SELECT * FROM departments', (err, result) => {
        if (err) {
            console.log(err);
        }
        else if (result) {
            console.table(result.rows);
            basePrompt();
        }
    });
};
const createDepartment = () => {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'choice',
            message: 'Whats the name of your department?'
        }
    ])
        .then(res => {
        pool.query('INSERT INTO departments (name) VALUES ($1)', [res.choice], (err, result) => {
            if (err) {
                console.log(err);
            }
            else if (result) {
                console.log(colors.green('Department successfully added'));
                basePrompt();
            }
        });
    });
};
// -------------------role----------------------
const getAllRole = () => {
    pool.query('SELECT * FROM roles', (err, result) => {
        if (err) {
            console.log(err);
        }
        else if (result) {
            console.table(result.rows);
            basePrompt();
        }
    });
};
const createRole = () => {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Whats the title of the role?'
        },
        {
            type: 'input',
            name: 'income',
            message: 'Whats the salary for this role?'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Whats the department Id?'
        }
    ])
        .then(res => {
        pool.query('INSERT INTO roles (title, salary, department) VALUES ($1, $2, $3)', [res.title, res.income, res.departmentId], (err, result) => {
            if (err) {
                console.log(err);
            }
            else if (result) {
                console.log(colors.green('Role successfully added'));
                basePrompt();
            }
        });
    });
};
// -------------------employee----------------------
const getAllEmployee = () => {
    pool.query('SELECT * FROM employees', (err, result) => {
        if (err) {
            console.log(err);
        }
        else if (result) {
            console.table(result.rows);
            basePrompt();
        }
    });
};
const updateEmployeeRole = () => {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Whats the ID of the employee that you want to update?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Whats the new role Id for this employee?'
        }
    ])
        .then(res => {
        console.log(res.choice);
        pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [res.roleId, res.employeeId], (err, result) => {
            if (err) {
                console.log(err);
            }
            else if (result) {
                console.log(colors.green('Employee role successfully updated'));
                basePrompt();
            }
        });
    });
};
const createEmployee = () => {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'nameE',
            message: 'Whats the name for this employee?'
        },
        {
            type: 'input',
            name: 'lastnameE',
            message: 'Whats the last name for this employee?'
        },
        {
            type: 'input',
            name: 'roleE',
            message: 'Whats the role Id for this employee?'
        },
        {
            type: 'input',
            name: 'null',
            message: 'Whats the manager Id for this employee (if N/A type no)?'
        }
    ])
        .then(res => {
        const managerId = res.null === 'no' ? null : res.null;
        pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [res.nameE, res.lastnameE, res.roleE, managerId], (err, result) => {
            if (err) {
                console.log(err);
            }
            else if (result) {
                console.log(colors.green('Employee successfully created'));
                basePrompt();
            }
        });
    });
};
basePrompt();
