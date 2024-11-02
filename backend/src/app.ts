import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import productsRouter from './routes/products';
import ordersRouter from './routes/orders';

const { PORT, DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek' } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(DB_ADDRESS);

app.use('/product', productsRouter);
app.use('/order', ordersRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
