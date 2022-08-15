import * as express from 'express';
import * as bodyParser from 'body-parser';
import AppRoutes from './routes/index';
import Database from './config/Database';
import {CommonRoutesConfig} from './common/routes.config';

class App {
    public app: express.Application;
    public port: number;
    public routes: Array<CommonRoutesConfig> = [];

    // @ts-ignore
    appRoutes = new AppRoutes();
    // public database = new Database();

    constructor(port: number) {
        // const app = express.default();
        // this.port = port;

console.log('a');
process.exit();

        // this.initializeMiddlewares();
        // this.initializeRouters(this.appRoutes.routers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
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