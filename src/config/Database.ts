import * as mongoose from 'mongoose';

class Database {

    public async connect()
    {
        await mongoose.connect(Database.getConnectionString());
    }

    private static getConnectionString(): string
    {
        const authUsername = process.env.MONGODB_USERNAME;
        const authPassword = process.env.MONGODB_PASSWORD;

        if (authUsername === '' || authPassword === '') {
            return 'mongodb://'+ process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DATABASE;
        }

        return 'mongodb://'+ process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWORD + '@' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DATABASE;
    }
}

export default Database;
