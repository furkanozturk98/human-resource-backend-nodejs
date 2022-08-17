import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv        from 'dotenv';
import Database from './config/Database';
import {CommonRoutesConfig} from './common/routes.config';
import EmployeesRoutes from "./routes/EmployeeRoutes";

class App {
    public app: express.Application;
    public port: number;
    public routes: Array<CommonRoutesConfig> = [];

    public database = new Database();

    constructor(port: number) {
        // @ts-ignore
        this.app = express.default();
        this.port = port;

        dotenv.config();

        this.initializeMiddlewares();

        // this.initializeRouters(this.appRoutes.routers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());

        let employeesRoutes = new EmployeesRoutes(this.app);
        employeesRoutes.configureRoutes();
    }
    // Initialize all the routes of the application
    // private initializeRouters(router: ) {
    //     router.forEach(routes => {
    //         this.app.use('/', routes);
    //     });
    // }

    // Server will listen to this port
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

}

export default App;