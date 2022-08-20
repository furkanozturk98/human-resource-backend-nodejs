import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv        from 'dotenv';
import Database from './config/Database';
import EmployeesRoutes from "./routes/EmployeeRoutes";
import container from './services/Container';
import {LocaleService} from "./services/LocaleService";
import AuthRoutes from "./routes/AuthRoutes";

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

        const authRoutes = new AuthRoutes(this.app);
        authRoutes.configureRoutes();

        const employeesRoutes = new EmployeesRoutes(this.app);
        employeesRoutes.configureRoutes();
    }


    public listen(): void
    {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

}

export default App;