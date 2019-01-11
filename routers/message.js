import express from 'express';
import messageController from '../controllers/message';
import Validate from 'express-validation';
import { createMessage } from '../validate/message';
import Auth from '../middlewares/authentica';

const messageControllers = new messageController();
const Authentication = new Auth();
const router = express.Router();

router
      .get('/messages', [Authentication.auth], messageControllers.getAll)
      .post('/messages', [Validate(createMessage), Authentication.auth], messageControllers.createMessage)
      .delete('/messages/:id', messageControllers.deleteMessage)
      .put('/messages/:id', messageControllers.updateMessage);

export default router;