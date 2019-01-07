import User from '../models/user';
import bcrypt from 'bcrypt';
// const saltRounds = 10;

class Users {
    async getAll (req, res, next) {
        try {
            const users = await User.find();
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
            console.log(user._doc.password);
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
            const user = await User.findOne({ email });
            if (!user) {
                return next(new Error('User is not found'));
            }
            const isCorrectPassword = bcrypt.compareSync(password, user.password) ;
            if (isCorrectPassword === false) {
                return next(new Error('Password is not correct'));
            }
            return res.json({
                isSuccess: true,
                message: 'Login successfully'
            });
        } catch (e) {
            return next(e);
        }
    }

    async updatePass (req, res, next) {
        try {
           
            const { email, password, newpass, renewpass } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return next(new Error('User is not found'));
            }
            const isCorrectPassword = await bcrypt.compareSync(password, user.password);
            if (!isCorrectPassword) {
                return next(new Error('Old Password is not correct'));
            }
            if (!newpass) {
                return next(new Error('New pass is required'));
            }
            if (newpass !== renewpass) {
                return next(new Error('Repassword is not match'));
            }
            user.password = newpass;
            await user.save();
            
            return res.json({
                isSuccess: true,
                message: 'update successfully'
            });

        } catch (e) {
            return next(e);
        }
    }

}

module.exports = Users;