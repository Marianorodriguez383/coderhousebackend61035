import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true },
  stock: { type: Number, required: true }
});

// Añadir el plugin de paginación
ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', ProductSchema);

export default Product;



