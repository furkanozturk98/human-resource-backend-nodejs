import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/ErrorsUtil';
import AuthService from '../services/AuthService';

class AuthController {

    async login(req: Request, res: Response): Promise<Response>
    {
        try {
            const foundUser = await AuthService.login(req.body);
            res.status(200).send(foundUser);
        } catch (error) {
            return res.status(401).send({
                error : getErrorMessage(error)
            });
        }
    }

    async register(req: Request, res: Response): Promise<Response>
    {
        try {
            await AuthService.register(req.body);
            res.status(200).send('Inserted successfully');
        } catch (error) {
            return res.status(500).send(getErrorMessage(error));
        }
    }
}

export default new AuthController;