import { celebrate, Joi, Segments } from 'celebrate';
import { IProduct } from '../models/product';

const productSchemaForValidation = Joi.object<IProduct>({
  title: Joi.string().required().min(3).max(30),
  image: {
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  },
  category: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number(),
});

interface IOrder {
  payment: 'card' | 'online';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

const orderSchemaForValidation = Joi.object<IOrder>({
  payment: Joi.required().equal('card', 'online'),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  total: Joi.number().required(),
  items: Joi.array().items(Joi.string()).required(),
});

export const productRouteValidator = celebrate({
  [Segments.BODY]: productSchemaForValidation,
});

export const orderRouteValidator = celebrate({
  [Segments.BODY]: orderSchemaForValidation,
});
