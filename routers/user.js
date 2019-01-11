import express from 'express';
import userController from '../controllers/user';
import Validate from 'express-validation';
import { createUser, updateUser, changePassword } from '../validate/user';
import Auth from '../middlewares/authentica';
const router = express.Router();
const userControllers = new userController();
const Authentication = new Auth();



router
    .post('/users', [ Validate(createUser) ], userControllers.addUser)
    .get('/users', [Authentication.auth], userControllers.getAll);
   
router.post('/login', userControllers.login);
router.put('/update/:id', [Validate(changePassword), Authentication.auth], userControllers.updatePass);

module.exports = router;