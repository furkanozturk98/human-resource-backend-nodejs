import * as express from 'express';
import employeesService from '../services/EmployeeService';
import * as argon2 from 'argon2';
import debug from 'debug';

const log: debug.IDebugger = debug('app:employees-controller');
class EmployeeController {

    async listEmployees(req: express.Request, res: express.Response) {
        const employees = await employeesService.list(100, 0);
        res.status(200).send(employees);
    }

    async getEmployeeById(req: express.Request, res: express.Response) {
        const employee = await employeesService.show(req.params.employeeId);
        res.status(200).send(employee);
    }

    async creatEemployee(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        const employeeId = await employeesService.create(req.body);
        res.status(201).send({id: employeeId});
    }

    async put(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        log(await employeesService.update({id: req.params.employeeId, ...req.body}));
        res.status(204).send(``);
    }

    async removEemployee(req: express.Request, res: express.Response) {
        log(await employeesService.delete(req.params.employeeId));
        res.status(204).send(``);
    }
}

export default new EmployeeController();