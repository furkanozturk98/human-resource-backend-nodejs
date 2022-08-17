"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const bodyParser = __importStar(require("body-parser"));
const dotenv = __importStar(require("dotenv"));
const Database_1 = __importDefault(require("./config/Database"));
const EmployeeRoutes_1 = __importDefault(require("./routes/EmployeeRoutes"));
class App {
    constructor(port) {
        this.routes = [];
        this.database = new Database_1.default();
        // @ts-ignore
        this.app = express.default();
        this.port = port;
        dotenv.config();
        this.initializeMiddlewares();
        // this.initializeRouters(this.appRoutes.routers);
    }
    initializeMiddlewares() {
        this.app.use(bodyParser.json());
        let employeesRoutes = new EmployeeRoutes_1.default(this.app);
        employeesRoutes.configureRoutes();
    }
    // Initialize all the routes of the application
    // private initializeRouters(router: ) {
    //     router.forEach(routes => {
    //         this.app.use('/', routes);
    //     });
    // }
    // Server will listen to this port
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map