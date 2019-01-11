import { Router } from 'express';
import GroupController from '../controllers/group';
import Validate from 'express-validation';
import { createGroup, updateGroup} from '../validate/group.js';


const GroupControllers = new GroupController();
const router = new Router();



router.post('/groups', [ Validate(createGroup) ], GroupControllers.createGroup)
      .get('/groups', GroupControllers.getAll)
      .put('/groups/:id', [ Validate(updateGroup) ], GroupControllers.updateGroup)
      .delete('/groups/:id', GroupControllers.deleteGroup);
router.put('/groupsa/:id',GroupControllers.addMember);
router.delete('/groupsa/:id', GroupControllers.deleteMember);

export default router;