import * as express from 'express';
import CompanyService from '../services/CompanyService';
import Company from "../interfaces/Company";
import BaseMiddleware from "./BaseMiddleware";

class CompanysMiddleware extends BaseMiddleware
{
    /**
     * @param req
     * @param res
     * @param next
     */
    async validateRequiredBodyFields(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>
    {
        if (req.body && req.body.name) {
            next();
        } else {
            await CompanysMiddleware.logAndSendResponse(res, 'company_messages_body_fields')
        }
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    async validateSameNameDoesntExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>
    {
        const Company = await CompanyService.getCompanyByName(req.body.email);

        if (Company) {
            await CompanysMiddleware.logAndSendResponse(res, 'company_messages_email_exists')
        } else {
            next();
        }
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    async validateSameNameBelongToSameCompany(req: express.Request, res: express.Response, next: express.NextFunction) : Promise<void>
    {
        const Company: Company  = await CompanyService.getCompanyByName(req.body.email);

        if (Company && Company.id === req.params.id) {
            next();
        } else {
            await CompanysMiddleware.logAndSendResponse(res, 'company_messages_invalid_email')
        }
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    async validateCompanyExists(req: express.Request, res: express.Response, next: express.NextFunction) : Promise<void>
    {
        const Company = await CompanyService.show(req.params.id);
        if (Company) {
            next();
        } else {
            await CompanysMiddleware.logAndSendResponse(res, 'company_not_found')
        }
    }
}

export default new CompanysMiddleware();