import * as express from 'express';
import EmployeeService from '../services/EmployeeService';

class EmployeeController
{
    /**
     * @param req
     * @param res
     */
    async list(req: express.Request, res: express.Response): Promise<void>
    {
        const employees = await EmployeeService.list(15, 1);

        res.status(200).send(employees);
    }

    /**
     * @param req
     * @param res
     */
    async show(req: express.Request, res: express.Response): Promise<void>
    {
        const employee = await EmployeeService.show(req.params.id);

        res.status(200).send(employee);
    }

    /**
     * @param req
     * @param res
     */
    async create(req: express.Request, res: express.Response): Promise<void>
    {
        // req.body.password = await argon2.hash(req.body.password);
        const employee = await EmployeeService.create(req.body);

        res.status(201).send(employee);
    }

    /**
     * @param req
     * @param res
     */
    async update(req: express.Request, res: express.Response): Promise<void>
    {
        const data = await EmployeeService.update(req.params.id, req.body);

        res.status(204).send(data);
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