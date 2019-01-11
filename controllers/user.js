import User from '../models/user';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import key from '../config/development';
// const saltRounds = 10;

class Users {
    async getAll (req, res, next) {
        try {
            const users = await User.find().sort({ _id: -1 }).limit(10).lean(true);
            console.log(users);
            return res.json({
                isSuccess: true,
                users
            });
        } catch (e) {
            return next(e);
        }
    }

    

    async addUser (req, res, next) {
        try {
            const { fullName, email, password } = req.body;
            const user = new User({
                fullName,
                email,
                password        
            });
            await user.save();
            delete user._doc.password;
            return res.json({
                isSuccess: true,
                user
            });

        } catch (e) {
            return next(e);
        }
    }

    async login (req, res, next) {
        try {
            const { email , password } = req.body;
            // const hash = bcrypt.hashSync(password, saltRounds);
            const user = await User.findOne({ email }).select('password email').lean(true);
            if (!user) {
                return next(new Error('User is not found'));
            }
            const isCorrectPassword = bcrypt.compareSync(password, user.password) ;
            if (isCorrectPassword === false) {
                return next(new Error('Password is not correct'));
            }
            delete user.password;
            const token = await JWT.sign(user, key.sceret);
            return res.json({
                isSuccess: true,
                user,
                token
        });

        } catch (e) {
            return next(e);
        }
    }

    async updatePass (req, res, next) {
        try {
            const id = req.user._id;
            const {  password, passwordConfirm } = req.body;
            const user = await User.findById(id).select('password').lean(true);
            if (!user) {
                return next(new Error('User is not found'));
            }
            const isCorrectPassword = await bcrypt.compareSync(password, user.password);
            if (!isCorrectPassword) {
                return next(new Error('Old Password is not correct'));
            }
            const hash = bcrypt.hashSync(passwordConfirm, 10);
            user.password = passwordConfirm;
            await User.update({ _id: id }, { $set: { password: hash } });         
            return res.json({
                isSuccess: true,
                message: 'Update successfully'
            });

        } catch (e) {
            return next(e);
        }
    }


}

module.exports = Users;