import Product from './models/Product.js';

class ProductManager {
  async getProducts(filters, options) {
    return await Product.find(filters).sort(options.sort).skip(options.skip).limit(options.limit);
  }

  async countProducts(filters) {
    return await Product.countDocuments(filters);
  }

  async getProductsPaginated(filters, options) {
    const { limit, page, sort } = options;
    const skip = (page - 1) * limit;
    const totalCount = await this.countProducts(filters);

    const products = await Product.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = page;
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevPage = hasPrevPage ? page - 1 : null;

    return {
      docs: products,
      totalDocs: totalCount,
      limit,
      totalPages,
      page: currentPage,
      nextPage,
      prevPage,
      hasNextPage,
      hasPrevPage
    };
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