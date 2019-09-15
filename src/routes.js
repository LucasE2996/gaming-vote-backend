import { Router } from 'express';
import UserController from './app/controllers/UserController';
import GameController from './app/controllers/GameController';
import VoteController from './app/controllers/VoteController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/user/new', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/game', GameController.index);
routes.post('/game', GameController.store);
routes.post('/user/:gameId/vote', VoteController.store);

export default routes;
