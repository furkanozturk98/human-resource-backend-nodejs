import * as express from 'express';
import App from "../app";
import {validateToken} from "../utils/JwtUtil";
import UserProfileService from "../services/UserProfileService";
import UserProfileTransformer from "../services/Transformers/UserProfileTransformer";
import User from "../interfaces/User";

class UserProfileController
{
    /**
     * @param req
     * @param res
     */
    async me(req: express.Request, res: express.Response): Promise<void>
    {
        let jwt = req.headers.authorization;

        if (jwt.toLowerCase().startsWith('bearer')) {
            jwt = jwt.slice('bearer'.length).trim();
        }

        const decodedToken = await validateToken(jwt);

        console.log(decodedToken.userId);

        const user = await UserProfileService.show(decodedToken.userId);

        res.status(200).send({
            data : UserProfileTransformer.transform(user as User)
        });
    }
}

export default new UserProfileController;