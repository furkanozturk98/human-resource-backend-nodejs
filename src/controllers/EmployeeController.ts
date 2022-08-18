import * as express from 'express';
import EmployeesService from '../services/EmployeeService';
import * as argon2 from 'argon2';
import debug from 'debug';

const log: debug.IDebugger = debug('app:employees-controller');
class EmployeeController {

    async list(req: express.Request, res: express.Response) {
        const employees = await EmployeesService.list(15, 1);

        res.status(200).send(employees);
    }

    async getEmployeeById(req: express.Request, res: express.Response) {
        const employee = await EmployeesService.show(req.params.employeeId);
        res.status(200).send(employee);
    }

    async creatEemployee(req: express.Request, res: express.Response) {
        // req.body.password = await argon2.hash(req.body.password);
        const employee = await EmployeesService.create(req.body);
        res.status(201).send();
    }

    async put(req: express.Request, res: express.Response) {
        // req.body.password = await argon2.hash(req.body.password);
        const data = await EmployeesService.update(req.params.employeeId, req.body);
        log(data);
        res.status(204).send(data);
    }

    async removEemployee(req: express.Request, res: express.Response) {
        log(await EmployeesService.delete(req.params.employeeId));
        res.status(204).send(``);
    }
}

export default new EmployeeController;