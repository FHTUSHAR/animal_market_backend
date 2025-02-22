import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { AnimaleValidation } from './animal.validation';
import { AnimalController } from './animal.controller';


const router = express.Router() ;

router.post('/create-animal', validateRequest(AnimaleValidation.animalSchema), AnimalController.createAnimal)
router.get('/:id',AnimalController.getSingleAnimal)
router.delete('/:id',AnimalController.deleteAnimal)
router.get('/',AnimalController.getAllAnimals)

router.patch('/:id',validateRequest(AnimaleValidation.updateAnimalSchema),AnimalController.updateAnimal)
export const AnimalRoute = router;