import mongoose from 'mongoose';
import ProductManager from './dao/mongo/ProductManager.js';
import CartManager from './dao/mongo/CartManager.js';

// Conexión a MongoDB
mongoose.connect('mongodb+srv://marianorodriguez383:141090Morchu@cluster0.uom6ndo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log('MongoDB Connected successfully');

  // Crear instancias de los managers
  const productManager = new ProductManager();
  const cartManager = new CartManager();

  // Crear un nuevo carrito
  const newCart = await cartManager.createCart();
  console.log('Nuevo carrito:', newCart);

  // Aquí usa ObjectId válidos de tu base de datos
  const cartId = newCart._id; // Usa el ID del carrito que acabas de crear
  const productId = new mongoose.Types.ObjectId(); // Crea un nuevo ID para el producto

  // Agregar un producto al carrito
  try {
    const updatedCart = await cartManager.addProductToCart(cartId, productId, 2);
    console.log('Carrito actualizado:', updatedCart);
  } catch (error) {
    console.error('Error:', error);
  }

  // Obtener el carrito por ID
  try {
    const fetchedCart = await cartManager.getCartById(cartId);
    console.log('Carrito obtenido:', fetchedCart);
  } catch (error) {
    console.error('Error:', error);
  }

  // Eliminar un producto
  try {
    await productManager.deleteProduct(productId);
    console.log('Producto eliminado');
  } catch (error) {
    console.error('Error:', error);
  }

  // Cerrar la conexión
  mongoose.connection.close();
});
