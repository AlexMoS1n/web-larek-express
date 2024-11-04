import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { errors } from 'celebrate';
import { rateLimit } from 'express-rate-limit';
import productsRouter from './routes/products';
import pageNotFound from './middlewares/notFoundPage';
import ordersRouter from './routes/orders';
import { errorLogger, requestLogger } from './middlewares/logger';
import errorsHandler from './middlewares/errors';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: 'Превышено количество запросов к серверу. Дождитесь окончания 15 минутного интервала времени',
});

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek' } = process.env;

const app = express();
app.use(limiter);
mongoose.connect(DB_ADDRESS);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/product', productsRouter);
app.use('/order', ordersRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use(pageNotFound);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
