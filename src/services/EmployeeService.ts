import {CRUD} from "../common/interfaces/crud.interface";
import EmployeeInterface from "../interfaces/Employee";
import Employee from "../models/Employee";
import {logger} from "./Logger";

class EmployeeService implements CRUD
{
    /**
     * @param limit
     * @param page
     */
    async list(limit: number, page: number)
    {
        return await Employee.paginate({}, {
            page         : page,
            limit        : limit,
            customLabels : {
                docs : 'data',
            }
        });
    }

    /**
     * @param id
     */
    async show(id: string)
    {
        return Employee.findById(id);
    }

    /**
     * @param resource
     */
    async create(resource: EmployeeInterface)
    {
        try{
            await Employee.create(resource);
            logger.info("Employee Created : ", resource);
        }
        catch (e) {
            logger.error("Error On Creating Employee : ", {
                error : e
            });
        }
    }

    /**
     * @param id
     * @param resource
     */
    async update(id: string, resource: EmployeeInterface)
    {
        try {
            await Employee.findByIdAndUpdate(id, resource, {new : true});
            logger.info("Employee Updated : ", resource);
        }
        catch (e) {
            logger.error("Error On Updating Employee : ", {
                error : e
            });
        }
    }

    /**
     * @param id
     */
    async delete(id: string): Promise<void>
    {
        try {
            await Employee.findByIdAndDelete(id);
            logger.info("Employee Deleted : ", id);
        }
        catch (e) {
            logger.error("Error On Deleting Employee : ", {
                error : e
            });
        }
    }

    /**
     * @param email
     */
    async getEmployeeByEmail(email: string)
    {
        const query = Employee.findOne({email : email})
        await query.clone();

        return query;
    }
}

export default new EmployeeService();