import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/product';
import { messageBadRequestError } from '../errors/messages/error-messages';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { items, total } = req.body;
  const id = faker.string.uuid();
  const totalSum = await items.reduce(async (sum:number, item: string[]) => {
    const product = await Product.findOneAndDelete({ _id: item });
    if (product) {
      if (product.price === null) {
        return sum;
      }
      return sum + product.price;
    }
    const error = new MongooseError(messageBadRequestError.productNotFound);
    return next(error);
  }, 0);
  if (total !== totalSum) {
    const error = new MongooseError(messageBadRequestError.incorrectOrderAmount);
    return next(error);
  }
  return res.status(201).send({ id, total: totalSum });
};

export default createOrder;
