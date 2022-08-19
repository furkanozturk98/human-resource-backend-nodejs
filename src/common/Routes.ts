import * as express from 'express';

export abstract class Routes {
    app: express.Application;
    name: string;

    protected constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }

    abstract configureRoutes(): express.Application;
}