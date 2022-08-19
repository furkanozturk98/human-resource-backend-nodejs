import Database from "../config/Database";
import UserTableSeeder from "./UserTableSeeder";
import * as dotenv from "dotenv";

export default class DatabaseSeeder
{
    private database: Database;

    constructor()
    {
        dotenv.config();
        this.database = new Database();
    }

    async seed(): Promise<void>
    {
        await this.database.connect();

        const userTableSeeder = new UserTableSeeder();
        await userTableSeeder.seed();

        process.exit();
    }
}