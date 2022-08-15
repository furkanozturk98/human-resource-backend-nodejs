import {CommonRoutesConfig} from '../common/routes.config';
import EmployeeController from '../controllers/EmployeeController';
import EmployeeMiddleware from '../middlewares/EmployeeMiddleware';
import * as express from 'express';

export class employeesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'employeesRoutes');
    }

    configureRoutes() {
        this.app.route(`/employees`)
            .get(EmployeeController.listEmployees)
            .post(
                EmployeeMiddleware.validateRequiredemployeeBodyFields,
                EmployeeMiddleware.validateSameEmailDoesntExist,
                EmployeeController.creatEemployee);

        this.app.param(`userId`, EmployeeMiddleware.extractemployeeId);
        this.app.route(`/employees/:userId`)
            .all(EmployeeMiddleware.validateemployeeExists)
            .get(EmployeeController.getEmployeeById)
            .delete(EmployeeController.removEemployee);

        this.app.put(`/employees/:userId`,[
            EmployeeMiddleware.validateRequiredemployeeBodyFields,
            EmployeeMiddleware.validateSameEmailBelongToSameemployee,
            EmployeeController.put
        ]);

        return this.app;
    }
}