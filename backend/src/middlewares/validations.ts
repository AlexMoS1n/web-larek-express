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

export const productRouteValidator = celebrate({
  [Segments.BODY]: productSchemaForValidation
})