import * as express from 'express';
import CompanyService from '../services/CompanyService';
import Company from "../interfaces/Company";
import CompanyTransformer from "../services/Transformers/CompanyTransformer";
import {UploadedFile} from "express-fileupload";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import {logger} from "../services/Logger";

class CompanyController
{
    /**
     * @param req
     * @param res
     */
    async all(req: express.Request, res: express.Response): Promise<void>
    {
        const companies = await CompanyService.getPaginatedData(15, 1);

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
    async list(req: express.Request, res: express.Response): Promise<void>
    {
        const companies = await CompanyService.list();

        console.log(companies);

        res.status(200).send({
            data : CompanyTransformer.transformList(companies.data as Company[])
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
        if (req.files && Object.keys(req.files).length > 0) {

            const file = req.files.file as UploadedFile;

            const extension = file?.mimetype.replace('image/', '.')

            const fileName = uuidv4() + extension;

            const filePath = path.join(__dirname, "../../", "/static/" + fileName)

            file.mv(filePath, function (err) {
                if (err){
                    logger.error("Error On Uploading File : ", {
                        error : err
                    });

                    res.status(400).send(err);
                }
            })

            req.body.logo = fileName;
        }

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