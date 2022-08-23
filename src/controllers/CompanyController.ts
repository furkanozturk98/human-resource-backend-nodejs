import * as express from 'express';
import CompanyService from '../services/CompanyService';
import Company from "../interfaces/Company";
import CompanyTransformer from "../services/Transformers/CompanyTransformer";

class CompanyController
{
    /**
     * @param req
     * @param res
     */
    async list(req: express.Request, res: express.Response): Promise<void>
    {
        const companies = await CompanyService.list(15, 1);

        res.status(200).send(
            CompanyTransformer.transformMany(companies.data as Company[])
        );
    }

    /**
     * @param req
     * @param res
     */
    async show(req: express.Request, res: express.Response): Promise<void>
    {
        const company = await CompanyService.show(req.params.id);

        res.status(200).send({
            data : CompanyTransformer.transform(company)
        });
    }

    /**
     * @param req
     * @param res
     */
    async create(req: express.Request, res: express.Response): Promise<void>
    {
        const company = await CompanyService.create(req.body);

        res.status(201).send({
            data : CompanyTransformer.transform(company)
        });
    }

    /**
     * @param req
     * @param res
     */
    async update(req: express.Request, res: express.Response): Promise<void>
    {
        const company = await CompanyService.update(req.params.id, req.body);

        res.status(200).send({
            data : CompanyTransformer.transform(company)
        });
    }

    /**
     * @param req
     * @param res
     */
    async delete(req: express.Request, res: express.Response): Promise<void>
    {
        await CompanyService.delete(req.params.id);

        res.status(204).send(``);
    }
}

export default new CompanyController;