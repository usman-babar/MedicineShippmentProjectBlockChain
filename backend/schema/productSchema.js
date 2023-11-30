
import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  // productId will be auto-incremented before saving
  productId: { type: Number, unique: true },
  name: { type: String, required: true },
  description: String,
  category: String,
  manufacturer: String,
  batchNumber: { type: String, required: true },
  expirationDate: Date,
  productionDate: Date,
  quantity: { type: Number, default: 0 },
  unitPrice: { type: Number, default: 0 },
});

// Auto-incrementing productId using a pre-save middleware
productSchema.pre('save', async function (next) {
  if (!this.isNew) {
    // Only auto-increment if the document is new
    return next();
  }

  try {
    const count = await mongoose.model('Product').countDocuments();
    this.productId = count + 1;
    next();
  } catch (error) {
    next(error);
  }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
