import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ValidationAdminZodSchema } from './admin.validation'
import { AdminController } from './admin.controller'


const router=express.Router()

router.post('/create-admin', validateRequest(ValidationAdminZodSchema.adminSchema), AdminController.createAdmin)
router.get('/:id',AdminController.getSingleAdmin)
router.delete('/:id',AdminController.deleteAdmin)
router.get('/',AdminController.getAllAdmins)
router.patch('/:id',validateRequest(ValidationAdminZodSchema.updateAdminSchema),AdminController.updateAdmin)

export const AdminRoute = router;