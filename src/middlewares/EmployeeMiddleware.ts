import * as express from 'express';
import employeeService from '../services/EmployeeService';
import Employee from "../interfaces/Employee";
import BaseMiddleware from "./BaseMiddleware";

class EmployeesMiddleware extends BaseMiddleware
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
}

export default new EmployeesMiddleware();