import * as express from 'express';
import EmployeeService from '../services/EmployeeService';
import EmployeeTransformer from "../services/Transformers/EmployeeTransformer";
import Employee from "../interfaces/Employee";

class EmployeeController
{
    /**
     * @param req
     * @param res
     */
    async all(req: express.Request, res: express.Response): Promise<void>
    {
        const employees = await EmployeeService.getPaginatedData(15, 1);

        console.log(employees);

        res.status(200).send({
            data : EmployeeTransformer.transformMany(employees.data as Employee[])
        });
    }

    /**
     * @param req
     * @param res
     */
    async show(req: express.Request, res: express.Response): Promise<void>
    {
        const employee = await EmployeeService.show(req.params.id);

        res.status(200).send({
            data : EmployeeTransformer.transform(employee)
        });
    }

    /**
     * @param req
     * @param res
     */
    async create(req: express.Request, res: express.Response): Promise<void>
    {
        const employee = await EmployeeService.create(req.body);

        res.status(201).send({
            data : EmployeeTransformer.transform(employee)
        });
    }

    /**
     * @param req
     * @param res
     */
    async update(req: express.Request, res: express.Response): Promise<void>
    {
        const employee = await EmployeeService.update(req.params.id, req.body);

        res.status(200).send({
            data : EmployeeTransformer.transform(employee)    
        });
    }

    /**
     * @param req
     * @param res
     */
    async delete(req: express.Request, res: express.Response): Promise<void>
    {
        await EmployeeService.delete(req.params.id);

        res.status(204).send(``);
    }
}

export default new EmployeeController;