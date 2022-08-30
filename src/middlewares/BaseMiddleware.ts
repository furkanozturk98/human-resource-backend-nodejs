import * as express from "express";
import App from "../app";
import {logger} from "../services/Logger";
import mongoose from "mongoose";

class BaseMiddleware
{
    /**
     * @param req
     * @param res
     * @param next
     */
    async extractId(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>
    {
        const id = req.params.id;

        if( !mongoose.Types.ObjectId.isValid(id) ) {
            await BaseMiddleware.logAndSendResponse(res, 'record_not_found')
        }
        else
        {
            req.body.id = id;
            next();
        }
    }

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

    async validateEmail(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>
    {
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        const isValid = regexp.test(req.body.email);

        if(isValid) {
            next();
        }
        else {
            const response = {
                message : 'The given data was invalid.',
                errors  : {}
            };

            response.errors['email'] = ['The email field is not valid.']

            res.status(422).send(response);
        }
    }
}

export default BaseMiddleware;