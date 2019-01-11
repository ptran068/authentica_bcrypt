import JWT from 'jsonwebtoken';
import User from '../models/user';
import key from '../config/development';

class Authentication {
      
    async auth (req, res, next) {
        try {
            const token = req.body.token;
            if (!token) {
                return next(new Error('Not found authentication'));
            }
            const tokens = token.split('Bearer ');
            if (tokens.length !== 2 || tokens[0] !== '') {
                return next(new Error('Not authentication format'));
            }
            const authToken = tokens[1];
            const data = await JWT.verify(authToken, key.sceret);
            const _id = data._id;
            if (!_id) {
                return next(new Error('Cannot get _id from jwt payload'));
            }
            const user = await User.findById(_id).lean(true);
            if (!user) {
                return next(new Error('User is not found'));
            }
            // A request đến đây -> req.user = A
            // B request đến đây -> req.user = B
            req.user = user; // User A
            return next();
        } catch (e) {
            return next(new Error('Cannot authentication your account'));
        }
    }
}

module.exports = Authentication;