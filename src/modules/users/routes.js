import { Router } from 'express';
import * as UserController from './controller';

const router = new Router();

router.post('/users/auth', UserController.loginWithAuth);



export default router;
