import {Routes} from '../common/Routes';
import EmployeeController from '../controllers/EmployeeController';
import EmployeeMiddleware from '../middlewares/EmployeeMiddleware';
import * as express from 'express';

class EmployeesRoutes extends Routes
{
    constructor(app: express.Application)
    {
        super(app, 'EmployeesRoutes');
    }

    configureRoutes(): express.Application
    {
        this.app.route(`/api/employees`)
            .get(EmployeeController.all)
            .post(
                EmployeeMiddleware.validateRequiredemployeeBodyFields,
                EmployeeMiddleware.validateEmail,
                EmployeeMiddleware.validateSameEmailDoesntExist,
                EmployeeController.create
            );

        this.app.route(`/api/employees/:id`)
            .all(EmployeeMiddleware.validateemployeeExists)
            .get(EmployeeController.show)
            .delete(EmployeeController.delete);

        this.app.put(`/api/employees/:id`,[
            EmployeeMiddleware.validateRequiredemployeeBodyFields,
            EmployeeMiddleware.validateEmail,
            EmployeeMiddleware.validateSameEmailBelongToSameemployee,
            EmployeeController.update
        ]);

        return this.app;
    }
}

export default EmployeesRoutes;