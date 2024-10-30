import mongoose from 'mongoose';

interface IImageProduct {
  fileName: string,
  originalName: string;
}

interface IProduct {
  title: string;
  image: IImageProduct;
  category: string;
  description: string;
  price: number|null;
}

const imageProductSchema = new mongoose.Schema<IImageProduct>({
  fileName: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    unique: true,
  },
  image: imageProductSchema,
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: null,
  },
});

export default mongoose.model<IProduct>('product', productSchema);
