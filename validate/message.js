import Joi from 'joi';

exports.createMessage = {
    body: {
        message: Joi.string().min(1).max(255).required(),

    }
};