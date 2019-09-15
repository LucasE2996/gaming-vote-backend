import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

import User from '../models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation error' });
        }

        const userExists = await User.findOne({ email: req.body.email });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        req.body.password_hash = await bcrypt.hash(req.body.password, 8);

        const { id, name, email } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
        });
    }
}

export default new UserController();
