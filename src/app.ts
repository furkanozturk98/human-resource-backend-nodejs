import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv        from 'dotenv';
import Database from './config/Database';
import EmployeesRoutes from "./routes/EmployeeRoutes";

class App
{
    public app: express.Application;
    public port: number;

    public database = new Database();

    constructor(port: number) {
        this.app = express.default();
        this.port = port;

        dotenv.config();

        this.initializeMiddlewares();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());

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