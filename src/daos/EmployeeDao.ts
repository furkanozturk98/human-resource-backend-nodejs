import {Employee} from "../models/Employee";
import shortid from "shortid";
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

/**
 * NEVER employee THIS CLASS IN REAL LIFE.
 * This class was created to ease the explanation of other topics in the corresponding article.
 * For any real-life scenario, consider using an ODM/ORM to manage your own database in a better way.
 */
class EmployeeDao {
    employees: Array<Employee> = [];

    constructor() {
        log('Created new instance of employeesDao');
    }

    async addEmployee(employee: Employee) {
        employee.id = shortid.generate();
        this.employees.push(employee);
        return employee.id;
    }

    async getemployees() {
        return this.employees;
    }

    async getEmployeeById(employeeId: string) {
        return this.employees.find((employee: Employee) => employee.id === employeeId);
    }

    async putEmployeeById(employee: Employee) {
        const objIndex = this.employees.findIndex((obj: Employee) => obj.id === employee.id);
        this.employees.splice(objIndex, 1, employee);
        return `${employee.id} updated via put`;
    }

    async removeEmployeeById(employeeId: string) {
        const objIndex = this.employees.findIndex((obj: Employee) => obj.id === employeeId);
        this.employees.splice(objIndex, 1);
        return `${employeeId} removed`;
    }

    async getEmployeeByEmail(email: string) {
        const objIndex = this.employees.findIndex((obj: Employee) => obj.email === email);
        let currentemployee = this.employees[objIndex];
        if (currentemployee) {
            return currentemployee;
        } else {
            return null;
        }
    }
}

export default new EmployeeDao();