import Cart from './models/Cart.js';

class CartManager {
  async createCart() {
    const newCart = new Cart({ products: [] });
    return await newCart.save();
  }

  async getCartById(id) {
    return await Cart.findById(id).populate('products.productId');
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      if (!cartId) {
        throw new Error('El ID del carrito no puede estar vacío');
      }
  
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error('No se encontró el carrito');
      }
  
      const existingProduct = cart.products.find(p => p.productId.toString() === productId);
      
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
      
      return await cart.save();
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
      throw error; // Propaga el error para manejo en niveles superiores
    }
  }
}

export default CartManager;
