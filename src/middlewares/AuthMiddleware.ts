import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/JwtUtil';
import App from "../app";

/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 */
export const authorize = (allowedAccessTypes: string[]) => async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        let jwt = req.headers.authorization;

        if (!jwt) {
            return res.status(401).json({
                message : App.localeService.translate("invalid_token")
            });
        }

        // remove Bearer if using Bearer Authorization mechanism
        if (jwt.toLowerCase().startsWith('bearer')) {
            jwt = jwt.slice('bearer'.length).trim();
        }

        // verify token hasn't expired yet
        const decodedToken = await validateToken(jwt);

        const hasAccessToEndpoint = allowedAccessTypes.some(
            (at) => decodedToken.accessTypes.some((uat) => uat === at)
        );

        if (!hasAccessToEndpoint) {
            return res.status(401).json({
                message : App.localeService.translate("no_permission")
            });
        }

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({
                message : App.localeService.translate("expired_token")
            });
            return;
        }

        res.status(500).json({
            message : App.localeService.translate("failed_to_authenticate")
        });
    }
};