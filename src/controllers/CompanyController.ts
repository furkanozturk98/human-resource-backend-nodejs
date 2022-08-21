import * as express from 'express';
import CompanyService from '../services/CompanyService';

class CompanyController
{
    /**
     * @param req
     * @param res
     */
    async list(req: express.Request, res: express.Response): Promise<void>
    {
        const Companys = await CompanyService.list(15, 1);

        res.status(200).send(Companys);
    }

    /**
     * @param req
     * @param res
     */
    async show(req: express.Request, res: express.Response): Promise<void>
    {
        const Company = await CompanyService.show(req.params.id);

        res.status(200).send(Company);
    }

    /**
     * @param req
     * @param res
     */
    async create(req: express.Request, res: express.Response): Promise<void>
    {
        // req.body.password = await argon2.hash(req.body.password);
        const Company = await CompanyService.create(req.body);

        res.status(201).send(Company);
    }

    /**
     * @param req
     * @param res
     */
    async update(req: express.Request, res: express.Response): Promise<void>
    {
        const data = await CompanyService.update(req.params.id, req.body);

        res.status(200).send({
            data
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