import 'express-async-errors';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes.js';

const server = express();

server.use(express.static('public'));

server.use(morgan('tiny'));

server.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        preflightContinue: false,
    })
);


server.use(express.json());

server.use(express.urlencoded({ extended: true }));

server.use(router);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

if (import.meta.url === `file://${process.argv[1]}`) {
    server.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

export default server;