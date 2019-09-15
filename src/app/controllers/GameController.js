import Game from '../models/Game';

class GameController {
    async index(req, res) {
        const games = await Game.find({});

        if (!games) {
            return res.status(400).json({ error: 'Could not get any game :(' });
        }

        return res.json(games);
    }

    async store(req, res) {
        const { name, image } = req.body;

        const gameExists = await Game.findOne({ name });

        if (gameExists) {
            return res.status(400).json({ error: 'Game already exists!' });
        }

        const game = await Game.create({
            name,
            image,
        });

        return res.json(game);
    }
}

export default new GameController();
