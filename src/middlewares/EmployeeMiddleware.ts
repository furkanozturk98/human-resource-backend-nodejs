import * as express from 'express';
import employeeService from '../services/EmployeeService';
import debug from 'debug';

const log: debug.IDebugger = debug('app:employees-controller');
class employeesMiddleware {

    async validateRequiredemployeeBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body && req.body.email && req.body.password) {
            next();
        } else {
            res.status(400).send({error: `Missing required fields email and password`});
        }
    }

    async validateSameEmailDoesntExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        const employee = await employeeService.getEmployeeByEmail(req.body.email);
        if (employee) {
            res.status(400).send({error: `employee email already exists`});
        } else {
            next();
        }
    }

    async validateSameEmailBelongToSameemployee(req: express.Request, res: express.Response, next: express.NextFunction) {
        const employee = await employeeService.getEmployeeByEmail(req.body.email);
        if (employee && employee.id === req.params.employeeId) {
            next();
        } else {
            res.status(400).send({error: `Invalid email`});
        }
    }

    // Here we need to use an arrow function to bind `this` correctly
    validatePatchEmail = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.body.email) {
            log('Validating email', req.body.email);

            this.validateSameEmailBelongToSameemployee(req, res, next);
        } else {
            next();
        }
    }

    async validateemployeeExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const employee = await employeeService.show(req.params.employeeId);
        if (employee) {
            next();
        } else {
            res.status(404).send({error: `employee ${req.params.employeeId} not found`});
        }
    }

    async extractemployeeId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.employeeId;
        next();
    }
}

export default new employeesMiddleware();