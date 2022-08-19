import * as express from 'express';
import employeeService from '../services/EmployeeService';
import Employee from "../interfaces/Employee";
import {logger} from "../services/Logger";

class EmployeesMiddleware {

    /**
     * @param req
     * @param res
     * @param next
     */
    async validateRequiredemployeeBodyFields(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>
    {
        if (req.body && req.body.email && req.body.firstName) {
            next();
        } else {
            logger.info('Missing required fields email or first name');

            res.status(400).send({
                error : `Missing required fields email or first name`
            });
        }
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    async validateSameEmailDoesntExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>
    {
        const employee = await employeeService.getEmployeeByEmail(req.body.email);

        if (employee) {
            res.status(400).send({error : `employee email already exists`});
        } else {
            next();
        }
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    async validateSameEmailBelongToSameemployee(req: express.Request, res: express.Response, next: express.NextFunction) : Promise<void>
    {
        const employee: Employee  = await employeeService.getEmployeeByEmail(req.body.email);

        if (employee && employee.id === req.params.id) {
            next();
        } else {
            res.status(400).send({error : `Invalid email`});
        }
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    async validateemployeeExists(req: express.Request, res: express.Response, next: express.NextFunction) : Promise<void>
    {
        const employee = await employeeService.show(req.params.id);
        if (employee) {
            next();
        } else {
            res.status(404).send({error : `employee ${req.params.id} not found`});
        }
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    async extractId(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>
    {
        req.body.id = req.params.id;
        next();
    }
}

export default new EmployeesMiddleware();