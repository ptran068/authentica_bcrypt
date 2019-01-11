import Joi from 'joi';

exports.createMessage = {
    body: {
        message: Joi.string().min(1).max(255).required(),

    }
};

exports.updateMessage = {
    body: {
        message: Joi.string().min(1).max(255).required(),

    },
    params: {
        id: Joi.string().required() 
    }
};