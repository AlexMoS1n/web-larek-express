import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const { PORT, DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek' } = process.env;

const app = express();
app.use(cors());
mongoose.connect(DB_ADDRESS);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
