import {CommonRoutesConfig} from '../common/routes.config';
import EmployeeController from '../controllers/EmployeeController';
import EmployeeMiddleware from '../middlewares/EmployeeMiddleware';
import * as express from 'express';

class EmployeesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'EmployeesRoutes');
    }

    configureRoutes() {
        this.app.route(`/employees`)
            .get(EmployeeController.listEmployees)
            .post(
                EmployeeMiddleware.validateRequiredemployeeBodyFields,
                EmployeeMiddleware.validateSameEmailDoesntExist,
                EmployeeController.creatEemployee);

        this.app.param(`employeeId`, EmployeeMiddleware.extractemployeeId);

        this.app.route(`/employees/:employeeId`)
            .all(EmployeeMiddleware.validateemployeeExists)
            .get(EmployeeController.getEmployeeById)
            .delete(EmployeeController.removEemployee);

        this.app.put(`/employees/:employeeId`,[
            EmployeeMiddleware.validateRequiredemployeeBodyFields,
            EmployeeMiddleware.validateSameEmailBelongToSameemployee,
            EmployeeController.put
        ]);

        return this.app;
    }
}

export default EmployeesRoutes;