import express from 'express';
import Joi from 'joi';
import userController from './controllers/user';
import Validate from 'express-validation';
import { createUser, updateUser } from './validate/user';
const router = express.Router();
const userControllers = new userController();



router
    .post('/users', [ Validate(createUser) ], userControllers.addUser)
    .get('/users', userControllers.getAll);
router.post('/login', userControllers.login);
router.post('/update', userControllers.updatePass);
module.exports = router;