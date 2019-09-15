import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes';

const server = express();

mongoose.connect(
    'mongodb+srv://wintaylor:w1nT4yL0R@cluster0-8vzz7.mongodb.net/omnistack?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
    }
);

server.use((req, res, next) => {
    console.log('\x1b[33m%s\x1b[0m', `Received a ${req.method} request`);
    return next();
});

server.use(cors());
server.use(express.json());
server.use(routes);

const port = process.env.PORT || 3333;
console.log('\x1b[34m%s\x1b[0m', `Listening on port ${port}`);
server.listen(port);
