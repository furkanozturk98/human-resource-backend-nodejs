import * as express from 'express';
import CompanyService from '../services/CompanyService';
import Company from "../interfaces/Company";
import BaseMiddleware from "./BaseMiddleware";
import {stringIsAValidUrl} from "../utils/ValidationUtil";

class CompanyMiddleware extends BaseMiddleware
{
    /**
     * @param req
     * @param res
     * @param next
     */
    async validateRequiredBodyFields(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>
    {
        if(req.body && req.body.name) {
            next();
        }
        else {
            const response = {
                message : 'The given data was invalid.',
                errors  : {}
            };

            if (!req.body.name) {
                response.errors['name'] = ['The name field is required.']
            }

            res.status(422).send(response);
        }
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    async validateWebsite(req: express.Request, res: express.Response, next: express.NextFunction) : Promise<void>
    {
        const isValid = await stringIsAValidUrl(req.body.website);

        if(isValid) {
            next();
        }
        else {
            const response = {
                message : 'The given data was invalid.',
                errors  : {}
            };

            response.errors['website'] = ['The website field is not valid.']

            res.status(422).send(response);
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
            await CompanyMiddleware.logAndSendResponse(res, 'company_messages_email_exists')
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
            await CompanyMiddleware.logAndSendResponse(res, 'company_messages_invalid_email')
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
            await CompanyMiddleware.logAndSendResponse(res, 'company_not_found')
        }
    }

}

export default new CompanyMiddleware();