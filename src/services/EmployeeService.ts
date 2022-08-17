import EmployeesDao from '../daos/EmployeeDao';
import {CRUD} from "../common/interfaces/crud.interface";
import EmployeeInterface from "../interfaces/Employee";
import Employee from "../models/Employee";

class EmployeeService implements CRUD {

    async create(resource: EmployeeInterface) {
        return Employee.create(resource);

        // return EmployeesDao.addEmployee(resource);
    }

    async delete(resourceId: string) {
        return EmployeesDao.removeEmployeeById(resourceId);
    };

    async list(limit: number, page: number) {
        return EmployeesDao.getemployees();
    };

    async show(resourceId: string) {
        return EmployeesDao.getEmployeeById(resourceId);
    };

    async update(resource: EmployeeInterface) {
        return EmployeesDao.putEmployeeById(resource);
    };

    async getEmployeeByEmail(email: string) {
        return EmployeesDao.getEmployeeByEmail(email);
    }
}

export default new EmployeeService();