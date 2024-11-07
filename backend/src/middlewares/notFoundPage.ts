import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/not-found-error';
import { messageNotFoundError } from '../errors/messages/error-messages';

const pageNotFound = (_req: Request, _res: Response, next: NextFunction) => {
  const err = new NotFoundError(messageNotFoundError.page);
  next(err);
};

export default pageNotFound;
