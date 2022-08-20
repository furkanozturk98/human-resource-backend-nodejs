import * as express from 'express';
import employeeService from '../services/EmployeeService';
import Employee from "../interfaces/Employee";
import {logger} from "../services/Logger";
import App from '../app';
import mongoose from "mongoose";

class EmployeesMiddleware
{
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
            await EmployeesMiddleware.logAndSendResponse(res, 'employee_messages_body_fields')
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
            await EmployeesMiddleware.logAndSendResponse(res, 'employee_messages_email_exists')
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
            await EmployeesMiddleware.logAndSendResponse(res, 'employee_messages_invalid_email')
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
            await EmployeesMiddleware.logAndSendResponse(res, 'employee_not_found')
        }
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    async extractId(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>
    {
        const id = req.params.id;

        if( !mongoose.Types.ObjectId.isValid(id) ) {
            await EmployeesMiddleware.logAndSendResponse(res, 'employee_not_found')
        }

        req.body.id = id;
        next();
    }

    /**
     * @param res
     * @param string
     */
    static async logAndSendResponse(res: express.Response, string: string): Promise<void>
    {
        const message = App.localeService.translate(string);

        logger.info(message);

        res.status(400).send({
            error : message
        });
    }
}

export default new EmployeesMiddleware();