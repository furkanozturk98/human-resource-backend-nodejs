import {Routes} from '../common/Routes';
import * as express from 'express';
import AuthController from "../controllers/AuthController";
import UserMiddleware from "../middlewares/UserMiddleware";

class AuthRoutes extends Routes {
    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
    }

    configureRoutes(): express.Application
    {
        this.app.route('/api/login')
            .post(
                UserMiddleware.validateRequiredBodyFields,
                AuthController.login
            )

        this.app.route('/register')
            .post(AuthController.register)

        return this.app;
    }
}

export default AuthRoutes;