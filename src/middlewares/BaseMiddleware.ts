import * as express from "express";
import App from "../app";
import {logger} from "../services/Logger";
import mongoose from "mongoose";

class BaseMiddleware
{
    /**
     * @param res
     * @param string
     */
    static async logAndSendResponse(res: express.Response, string: string): Promise<void>
    {
        const message = App.localeService.translate(string);

        logger.info(message);

        res.status(400).send({
            error : message
        });
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    async extractId(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>
    {
        const id = req.params.id;

        if( !mongoose.Types.ObjectId.isValid(id) ) {
            await BaseMiddleware.logAndSendResponse(res, 'invalid_id')
        }

        req.body.id = id;
        next();
    }
}

export default BaseMiddleware;