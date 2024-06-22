import Product from './models/Product.js';

class ProductManager {
  async getProducts() {
    return await Product.find();
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async addProduct(product) {
    const newProduct = new Product(product);
    return await newProduct.save();
  }

  async updateProduct(id, updatedProduct) {
    return await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default ProductManager;
