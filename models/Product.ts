import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: string;
  originalPrice?: string;
  category: string;
  image: string;
  images?: string[];
  badge?: string;
  badgeColor?: string;
  description: string;
  rating?: number;
  reviews?: number;
  materials?: string[];
  styles?: string[];
  inStock?: boolean;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  originalPrice: { type: String },
  category: { type: String, required: true },
    image: { type: String, required: true },
  images: { type: [String] },
  badge: { type: String },
  badgeColor: { type: String },
  description: { type: String, required: true },
  rating: { type: Number },
  reviews: { type: Number },
  materials: { type: [String] },
  styles: { type: [String] },
  inStock: { type: Boolean, default: true },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);