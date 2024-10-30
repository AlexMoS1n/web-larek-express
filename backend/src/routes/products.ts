import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/products';

const router = Router();
router.get('/', getProducts);
router.post('/', createProduct);
