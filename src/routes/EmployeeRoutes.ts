import {Routes} from '../common/Routes';
import EmployeeController from '../controllers/EmployeeController';
import EmployeeMiddleware from '../middlewares/EmployeeMiddleware';
import * as express from 'express';
import * as Auth from '../middlewares/AuthMiddleware';
import {unless} from "../utils/RouteUtil";

class EmployeesRoutes extends Routes
{
    constructor(app: express.Application)
    {
        super(app, 'EmployeesRoutes');
    }

    configureRoutes(): express.Application
    {
        // this.app.use(Auth.authorize(['employee.manage', 'company.manage']));
        this.app.use(unless(Auth.authorize(['employee.manage', 'company.manage']), "/login", "/register"));

        this.app.route(`/employees`)
            .get(EmployeeController.list)
            .post(
                EmployeeMiddleware.validateRequiredemployeeBodyFields,
                EmployeeMiddleware.validateSameEmailDoesntExist,
                EmployeeController.create);

        this.app.param(`id`, EmployeeMiddleware.extractId);

        this.app.route(`/employees/:id`)
            .all(EmployeeMiddleware.validateemployeeExists)
            .get(EmployeeController.show)
            .delete(EmployeeController.delete);

        this.app.put(`/employees/:id`,[
            EmployeeMiddleware.validateRequiredemployeeBodyFields,
            EmployeeMiddleware.validateSameEmailBelongToSameemployee,
            EmployeeController.update
        ]);

        return this.app;
    }
}

export default EmployeesRoutes;