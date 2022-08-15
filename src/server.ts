import App from './app';

const PORT = process.env.PORT || '5000';

const app = new App(
    parseInt(PORT,10)
);

// app.database.connect();