import * as express from 'express';
import employeeService from '../services/EmployeeService';
import Employee from "../interfaces/Employee";
import BaseMiddleware from "./BaseMiddleware";

class UserMiddleware extends BaseMiddleware
{
    /**
     * @param req
     * @param res
     * @param next
     */
    async validateRequiredBodyFields(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>
    {
        if(req.body && req.body.email && req.body.password) {
            next();
        }
        else {
            const response = {
                message : 'The given data was invalid.',
                errors  : {}
            };

            if (!req.body.email) {
                response.errors['email'] = ['The email field is required.']
            }

            if (!req.body.password) {
                response.errors['password'] = ['The password field is required.']
            }

            res.status(422).send(response);
        }
    }
}

export default new UserMiddleware();