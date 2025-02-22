import express from 'express'
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';


const router = express.Router() ;

router.post('/create-user', validateRequest(UserValidation.userSchema), UserController.createUser)
router.get('/:id',UserController.getSingleUser)
router.delete('/:id',UserController.deleteUser)
router.get('/',UserController.getAllUsers)

router.patch('/:id',validateRequest(UserValidation.updateUserSchema),UserController.updateUser)
export const UserRoute = router;