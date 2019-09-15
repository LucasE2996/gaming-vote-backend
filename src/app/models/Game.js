import { Schema, model } from 'mongoose';

class GameSchema extends Schema {
    constructor() {
        super(
            {
                name: {
                    type: String,
                    required: true,
                },
                image: {
                    type: String,
                    required: true,
                },
                votes: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'User',
                    },
                ],
            },
            {
                timestamps: true,
            }
        );
    }
}

export default model('Game', new GameSchema());
