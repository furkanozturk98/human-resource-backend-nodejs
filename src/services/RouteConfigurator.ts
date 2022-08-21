import AuthRoutes from "../routes/AuthRoutes";
import EmployeesRoutes from "../routes/EmployeeRoutes";
import CompanyRoutes from "../routes/CompanyRoutes";
import * as express from "express";

export class RouteConfigurator
{
    static async configurate(app: express.Application): Promise<void>
    {
        const routes = await RouteConfigurator.getRoutes();

        Object.keys(routes).forEach(function (key) {
            const instance = new routes[key](app);
            instance.configureRoutes();
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



