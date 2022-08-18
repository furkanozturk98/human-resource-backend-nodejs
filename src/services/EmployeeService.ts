import EmployeesDao from '../daos/EmployeeDao';
import {CRUD} from "../common/interfaces/crud.interface";
import EmployeeInterface from "../interfaces/Employee";
import Employee from "../models/Employee";

class EmployeeService implements CRUD {

    async list(limit: number, page: number) {

        return await Employee.paginate({}, {
            page: page,
            limit: limit,
            customLabels : {
                docs: 'data',
            }
        });
    };

    async show(id: string) {
        return Employee.findById(id);

    };

    async create(resource: EmployeeInterface) {
        return Employee.create(resource);
    }

    async update(id: string, resource: EmployeeInterface)
    {
        try {
            return await Employee.findByIdAndUpdate(id, resource, {new: true}, function (err, docs) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Updated Employee : ", docs);
                }
            })
        }
        catch (e) {
            
        }
    };

    async delete(id: string)
    {
        Employee.findByIdAndDelete(id);
    };

    async getEmployeeByEmail(email: string) {
        let query = Employee.findOne({email: email})
        await query.clone();

        return query;
    }
}

export default new EmployeeService();