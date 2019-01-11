import mongoose from 'mongoose';
import User from '../models/user';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const messageSchema = new Schema({
    author : {
        type: ObjectId,
        unique: true,
        required: true,
        ref: 'user'
    },
    message: {
        type: String,
        maxlength: [255, 'Message is too long'],
        required: true
    },
    group: {
        type: ObjectId,
        ref: 'group',
        unique: true
    },
    deleteAt: {
        type: Date,
        default: null

    }
}, { timestamps: true } );

messageSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        return next(new Error('this author or group has been using'));
    }
    return  next(error);
});

module.exports = mongoose.model('Message', messageSchema);
