/* eslint-disable prettier/prettier */
import { Router } from 'express'; 
import { userController } from './controller/user-controller';

const router= Router();
const baseUrl= '/user'; 

router.get(`${baseUrl}/:id`, userController.read);
router.post(`${baseUrl}`, userController.create);
export const userRouter = router; 