/* eslint-disable prettier/prettier */
import { Router } from 'express'; 
import { userController } from './controller/user-controller';


const router= Router();


const baseUrl= '/'; 


router.get(`${baseUrl}/`, userController.read ); 

export const userRouter = router; 