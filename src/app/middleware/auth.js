import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    // [, token] takes the second position in array, in this case the token
    const [, token] = authHeader.split(' ');

    try {
        // jwt.verify uses callback to return response, promisify makes it async/await
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.userId = decoded.id; // put userId in request

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token is invalid' });
    }
};
