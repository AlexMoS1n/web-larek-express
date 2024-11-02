import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/products';
import { productRouteValidator } from '../middlewares/validations';

const router = Router();
router.get('/', getProducts);
router.post('/', productRouteValidator, createProduct);

export default router;
