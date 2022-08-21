import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv        from 'dotenv';
import Database from './config/Database';
import container from './services/Container';
import {LocaleService} from "./services/LocaleService";
import {RouteConfigurator} from "./services/RouteConfigurator";

class App
{
    public app: express.Application;
    public port: number;
    public static localeService: LocaleService

    public database = new Database();

    constructor(port: number) {
        this.app = express.default();
        this.port = port;
        App.localeService = container.resolve('localeService');

        dotenv.config();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.app.use(bodyParser.json());

        RouteConfigurator.configurate(this.app)
    }


    public listen(): void
    {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

}

export default App;