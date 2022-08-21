import AuthRoutes from "../routes/AuthRoutes";
import EmployeesRoutes from "../routes/EmployeeRoutes";
import CompanyRoutes from "../routes/CompanyRoutes";
import * as express from "express";
import {unless} from "../utils/RouteUtil";
import * as Auth from "../middlewares/AuthMiddleware";
import EmployeeMiddleware from "../middlewares/EmployeeMiddleware";

export class RouteConfigurator
{
    static async configurate(app: express.Application): Promise<void>
    {
        const routes = await RouteConfigurator.getRoutes();

        app.use(unless(Auth.authorize(['employee.manage', 'company.manage']), "/login", "/register"));
        app.param(`id`, EmployeeMiddleware.extractId);

        Object.keys(routes).forEach(function (key) {
            new routes[key](app);
        })
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static async getRoutes()
    {
        return {
            AuthRoutes,
            EmployeesRoutes,
            CompanyRoutes
        }
    }
}



