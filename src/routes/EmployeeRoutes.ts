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
        this.app.route(`/employees`)
            .get(EmployeeController.list)
            .post(
                EmployeeMiddleware.validateRequiredemployeeBodyFields,
                EmployeeMiddleware.validateSameEmailDoesntExist,
                EmployeeController.create);

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