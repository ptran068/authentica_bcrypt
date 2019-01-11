// import bcrypt from 'bcrypt';
// import JWT from 'jsonwebtoken';
import Message from '../models/messages';

class Messages {
    
    async getAll (req, res, next) {
        try {
            const messages = await Message.find().populate([
                {
                    path: 'author'
                },
                {
                    path: 'group'
                }
            ]).lean(true);
            return res.json({
                isSuccess: true,
                messages
            });
        } catch (e) {
            return next(e);
        }
    }

    async createMessage (req, res, next) {
        try {
            const { message, group } = req.body;
            const user = req.user;
            const newMessage = new Message({
                author: user._id,
                message,
                group 
            });
            await newMessage.save();
            return res.json({
                isSuccess: true,
                message
            });
        } catch (e) {
            return next(e);
        }
    }
    async deleteMessage (req, res, next) {
        try {
            const idMess = req.params.id;
            const mess = await Message.findById(idMess).select('createdAt').lean(true);
            if (!mess) {
                return next(new Error('Message is not found'));
            }
            // mess.createdAt = new Date();
            await Message.update({ _id: idMess }, { $set: { createdAt: new Date() } });         
            return res.json({
                isSuccess: true,
                message: 'Update successfully'
            });
        } catch (e) {
            return next(e);
        }
    }
    async updateMessage (req, res, next) {
        try {
            const idMess = req.params.id;
            const mess = await Message.findById(idMess).select('message').lean(true);
            if (!mess) {
                return next(new Error('Message is not found'));
            }
            mess.message = req.body.message;
            await Message.update({ _id: idMess }, { $set: { message: mess.message } } );
            return res.json({
                isSuccess: true,
                message: 'Update successfully'
            });
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Messages;