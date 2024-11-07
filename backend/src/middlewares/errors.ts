import {
  NextFunction, Request, Response, ErrorRequestHandler,
} from 'express';
import { CelebrateError, isCelebrateError } from 'celebrate';
import BadRequestError from '../errors/bad-request-error';

function formatCelebrateError(err: CelebrateError) {
  const details = Array.from(err?.details?.values());
  return `${err.message}: ${details.map((e) => e.message).join(', ')}`;
}

const errorsHandler: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (isCelebrateError(err)) {
    const message: string = formatCelebrateError(err);
    const finalError = new BadRequestError(message);
    return res.status(finalError.statusCode).send({ message: finalError.message });
  }
  return res.status(err.statusCode || 500).send({ message: err.message || 'Internal Server Error' });
};

export default errorsHandler;
