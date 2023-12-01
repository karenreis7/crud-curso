import { Router } from 'express';
import { userController } from './controller/user-controller';

const router = Router();
const baseUrl = '/user';

router.get(`${baseUrl}/:id`, userController.read);
router.post(`${baseUrl}`, userController.create);
router.patch(`${baseUrl}/:id`, userController.update);
export const userRouter = router;
