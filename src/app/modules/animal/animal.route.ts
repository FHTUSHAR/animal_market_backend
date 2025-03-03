import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { AnimaleValidation } from './animal.validation';
import { AnimalController } from './animal.controller';
import { auth } from '../../middlewares/auth';
import { ENUM_USER_ROLL } from '../../../enum/userRole';


const router = express.Router() ;

router.post('/create-animal', validateRequest(AnimaleValidation.animalSchema), AnimalController.createAnimal)
router.get('/:id',AnimalController.getSingleAnimal)
router.delete('/:id',AnimalController.deleteAnimal)
router.get('/',auth(ENUM_USER_ROLL.ADMIN,ENUM_USER_ROLL.SELLER,ENUM_USER_ROLL.BUYER),AnimalController.getAllAnimals)

router.patch('/:id',validateRequest(AnimaleValidation.updateAnimalSchema),AnimalController.updateAnimal)
export const AnimalRoute = router;