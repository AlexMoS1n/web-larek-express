import { Router } from 'express';
import createOrder from '../controllers/orders';
import { orderRouteValidator } from '../middlewares/validations';

const router = Router();
router.post('/', orderRouteValidator, createOrder);

export default router;
