import { Schema, model } from 'mongoose';

class UserSchema extends Schema {
    constructor() {
        super(
            {
                name: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                },
                votes: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Game',
                    },
                ],
                password_hash: {
                    type: String,
                    required: true,
                },
            },
            {
                timestamps: true,
            }
        );
    }
}

const userSchema = new UserSchema();

export default model('User', userSchema);
