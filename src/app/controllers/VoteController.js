import User from '../models/User';
import Game from '../models/Game';

class VoteController {
    async store(req, res) {
        const { user_id } = req.headers;
        const { gameId } = req.params;

        const user = await User.findById(user_id);
        const game = await Game.findById(gameId);

        if (!user) {
            return res.status(400).json({ error: 'User does not exists!' });
        }

        if (!game) {
            return res.status(400).json({ error: 'Game does not exists!' });
        }

        const userHasVotedOnGame = user.votes.find(id =>
            id.toString().includes(game._id.toString())
        );

        if (userHasVotedOnGame) {
            user.votes = user.votes.filter(
                id => !id.toString().includes(game._id.toString())
            );
            game.votes = game.votes.filter(
                id => !id.toString().includes(user._id.toString())
            );
            await user.save();
            await game.save();
            console.log(
                `User ${user.name} has removed the vote on ${game.name}!`
            );
            return res.status(200).json({ userVoted: false });
        }

        if (user.votes.length >= 3) {
            console.log(`User ${user.name} tried to vote more than permitted!`);
            return res
                .status(405)
                .json({ error: 'User has achieved the maximum votes number!' });
        }

        user.votes.push(game._id);
        game.votes.push(user._id);

        await user.save();
        await game.save();

        console.log(`User ${user.name} has voted on ${game.name}!`);
        return res.status(200).json({ userVoted: true });
    }
}

export default new VoteController();
