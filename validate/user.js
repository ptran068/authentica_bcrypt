import Joi from 'joi';

exports.createUser = {
    body: {
        fullName: Joi.object().keys({
            firstName: Joi.string().min(3).max(30),
            lastName: Joi.string().min(3).max(30)
        }),
        email: Joi.string().required().email({ minDomainAtoms: 2 }).min(3).max(30),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(3).max(30).required(),
    },
};

exports.updateUser = {
    body: {
        fullName: Joi.object().keys({
            first: Joi.string().min(3).max(30),
            last: Joi.string().min(3).max(30)
        }),
        email: Joi.string().email({ minDomainAtoms: 2 })
    },
    params: {
       	id: Joi.string().required()
    }
};

exports.changePassword = {
    body: {
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(3).max(30).required(),
        newpass: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(3).max(30).required(),
        passwordConfirm: Joi.any().valid(Joi.ref('newpass')).required().options({ language: { any: { allowOnly: 'PasswordConfirm must match NewPassword' } } })
    }
};


