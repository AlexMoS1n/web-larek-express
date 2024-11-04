import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import DefaultServerError from '../errors/default-server-error';
import Product from '../models/product';
import { messageBadRequestError, messageDefaultServerError, messageDuplicateTitleError } from '../errors/messages/error-messages';
import DuplicateTitleError from '../errors/duplicate-title-error';
import BadRequestError from '../errors/bad-request-error';

export const getProducts = (_req: Request, res: Response, next: NextFunction) => Product.find({})
  .then((products) => res.status(201).send({
    items: products, total: products.length,
  }))
  .catch((err) => {
    next(new DefaultServerError(`${messageDefaultServerError.products} ${err.message}`));
  });

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const {
    title, image, category, description, price,
  } = req.body;
  return Product.create({
    title, image, category, description, price,
  })
    .then((product) => {
      res.send({ product });
    })
    .catch((err) => {
      if (err instanceof Error && err.message.includes('E11000')) {
        return next(new DuplicateTitleError(messageDuplicateTitleError.title));
      }
      if (err instanceof MongooseError.ValidationError) {
        return next(new BadRequestError(messageBadRequestError.productNotCreate));
      }
      return next(new DefaultServerError(messageDefaultServerError.server));
    });
};
