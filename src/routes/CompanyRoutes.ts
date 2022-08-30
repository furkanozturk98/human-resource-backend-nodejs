import {Routes} from '../common/Routes';
import CompanyController from '../controllers/CompanyController';
import CompanyMiddleware from '../middlewares/CompanyMiddleware';
import * as express from 'express';

class CompanyRoutes extends Routes
{
    constructor(app: express.Application)
    {
        super(app, 'CompanysRoutes');
    }

    configureRoutes(): express.Application
    {
        this.app.route(`/api/companies`)
            .get(CompanyController.all)
            .post(
                CompanyMiddleware.validateRequiredBodyFields,
                CompanyMiddleware.validateSameNameDoesntExist,
                CompanyController.create);

        this.app.route(`/api/companies/list`)
            .get(CompanyController.list);

        this.app.route(`/api/companies/:id`)
            .all(CompanyMiddleware.validateCompanyExists)
            .get(CompanyController.show)
            .delete(CompanyController.delete);

        this.app.post(`/api/companies/:id`,[
            // CompanyMiddleware.validateRequiredBodyFields,
            // CompanyMiddleware.validateSameNameBelongToSameCompany,
            CompanyController.update
        ]);

        return this.app;
    }
}

export default CompanyRoutes;