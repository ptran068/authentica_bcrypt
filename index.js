import express from 'express';
import userController from './controllers/user';
import Validate from 'express-validation';
import { createUser, updateUser } from './validate/user';
import Auth from './middlewares/authentica';
const router = express.Router();
const userControllers = new userController();
const Authentication = new Auth();



router
    .post('/users', [ Validate(createUser) ], userControllers.addUser)
    .get('/users', [Authentication.auth], userControllers.getAll)
    .put('/users', [Authentication.auth], userControllers.updateName);
router.post('/login', userControllers.login);
router.put('/update/:id', [Authentication.auth], userControllers.updatePass);

module.exports = router;