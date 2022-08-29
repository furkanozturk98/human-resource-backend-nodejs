import {Routes} from '../common/Routes';
import * as express from 'express';
import UserProfileController from "../controllers/UserProfileController";

class UserProfileRoutes extends Routes
{
    constructor(app: express.Application)
    {
        super(app, 'UserProfileRoutes');
    }

    configureRoutes(): express.Application
    {
        this.app.route('/api/users/me')
            .get(
                UserProfileController.me
            )

        return this.app;
    }
}

export default UserProfileRoutes;