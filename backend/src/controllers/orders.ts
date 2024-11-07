import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/product';
import { messageBadRequestError } from '../errors/messages/error-messages';
import BadRequestError from '../errors/bad-request-error';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { items, total } = req.body;
  const id = faker.string.uuid();
  try {
    const totalSum = await items.reduce(async (sum:number, item: string[]) => {
      let accum = await sum;
      const product = await Product.findOne({ _id: item });
      if (product) {
        if (product.price === null) {
          return accum;
        }
        accum += product.price;
        return accum;
      }
      const error = new MongooseError(messageBadRequestError.productNotFound);
      return next(error);
    }, 0);
    if (total !== totalSum) {
      const error = new MongooseError(messageBadRequestError.incorrectOrderAmount);
      return next(error);
    }
    return res.status(201).send({ id, total: totalSum });
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) {
      return next(new BadRequestError(messageBadRequestError.orderNotCreate));
    }
    return next(err);
  }
};

export default createOrder;
