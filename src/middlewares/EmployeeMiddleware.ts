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
        if(req.body && req.body.email && req.body.first_name && req.body.last_name && req.body.company) {
            next();
        }
        else {
            const response = {
                message : 'The given data was invalid.',
                errors  : {}
            };

            if (!req.body.first_name) {
                response.errors['first_name'] = ['The first name field is required.']
            }

            if (!req.body.email) {
                response.errors['email'] = ['The email field is required.']
            }

            if (!req.body.last_name) {
                response.errors['last_name'] = ['The last name field is required.']
            }

            if (!req.body.company) {
                response.errors['company'] = ['The company field is required.']
            }

            res.status(422).send(response);
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
            const response = {
                message : 'The given data was invalid.',
                errors  : {}
            };

            response.errors['email'] = ['The email is exists.']

            res.status(422).send(response);
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